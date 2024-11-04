import type { UsersRepository } from "@/repositories/users-repository";
import type { CreateUserInput } from "@/schemas/users";
import { hash } from "bcrypt";
import type { Selectable } from "kysely";
import type { Users } from "kysely-codegen";
import { PasswordDoNotMatchError } from "../errors/password-do-not-match";
import { ResourceAlreadyExists } from "../errors/resource-already-exists";

export interface CreateUserUseCaseResponse {
  user?: Selectable<Users>;
}

export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(data: CreateUserInput): Promise<CreateUserUseCaseResponse> {
    const { confirmPassword, ...rest } = data;
    const hasUser = await this.userRepository.findByEmail(rest.email);

    if (rest.role === "ADMIN") {
      const hasAdmin = await this.userRepository.findUserByRoleAndApplication(rest.role, rest.applicationId);

      if (hasAdmin) {
        throw new ResourceAlreadyExists();
      }
    }

    if (hasUser) {
      throw new ResourceAlreadyExists();
    }

    if (confirmPassword !== rest.password) {
      throw new PasswordDoNotMatchError();
    }

    const hashedPassword = await hash(rest.password, 6);

    const user = await this.userRepository.create({ ...rest, password: hashedPassword });

    return { user };
  }
}
