import { KyselyUsersRepository } from "@/repositories/kysely/kysely-users-repository";
import { CreateUserUseCase } from "../create-user/create-user";

export function makeCreateUserUseCase() {
  const usersRepository = new KyselyUsersRepository();
  const createUsersUseCase = new CreateUserUseCase(usersRepository);

  return createUsersUseCase;
}
