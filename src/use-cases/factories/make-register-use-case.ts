import { KyselyUsersRepository } from "@/repositories/kysely/kysely-users-repository";
import { RegisterUserUseCase } from "../register-user/register-user";

export function makeRegisterUseCase() {
  const usersRepository = new KyselyUsersRepository();
  const registerUseCase = new RegisterUserUseCase(usersRepository);

  return registerUseCase;
}
