import type { ApplicationsRepository } from "@/repositories/applications-repository";
import type { UpdateApplicationInput } from "@/schemas/applications";
import { hash } from "bcrypt";
import type { Selectable } from "kysely";
import type { Applications } from "kysely-codegen";
import { PasswordDoNotMatchError } from "../errors/password-do-not-match";
import { ResourceNotFoundError } from "../errors/resource-not-found";

type UpdateApplicationUseCaseResponse = {
  application?: Selectable<Applications>;
};

export class UpdateApplicationsUseCase {
  constructor(private applicationsRepository: ApplicationsRepository) {}

  async execute(data: UpdateApplicationInput): Promise<UpdateApplicationUseCaseResponse> {
    const { password, confirm_password, ...rest } = data;
    let hashedPassword: string | undefined;

    const hasApplication = await this.applicationsRepository.findById(rest.id);

    if (!hasApplication) {
      throw new ResourceNotFoundError();
    }

    if (password) {
      if (password !== confirm_password) {
        throw new PasswordDoNotMatchError();
      }

      hashedPassword = await hash(password ?? "", 6);
    }

    const application = await this.applicationsRepository.update({ password: hashedPassword, ...rest });

    return { application };
  }
}
