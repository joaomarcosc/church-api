import type { ApplicationsRepository } from "@/repositories/applications-repository";
import type { CreateApplicationInput } from "@/schemas/applications";
import { hash } from "bcrypt";
import type { Selectable } from "kysely";
import type { Applications } from "kysely-codegen";
import { PasswordDoNotMatchError } from "../errors/password-do-not-match";
import { ResourceAlreadyExists } from "../errors/resource-already-exists";

type CreateApplicationUseCaseResponse = {
  application?: Selectable<Applications>;
};

export class CreateApplicationsUseCase {
  constructor(private applicationsRepository: ApplicationsRepository) {}

  async execute(data: CreateApplicationInput): Promise<CreateApplicationUseCaseResponse> {
    const { confirm_password, ...rest } = data;
    const hasApplication = await this.applicationsRepository.findByEmail(rest.email);

    if (hasApplication) {
      throw new ResourceAlreadyExists("Application");
    }

    if (confirm_password !== rest.password) {
      throw new PasswordDoNotMatchError();
    }

    const hashedPassword = await hash(rest.password, 6);

    const application = await this.applicationsRepository.create({ ...rest, password: hashedPassword });

    return { application };
  }
}
