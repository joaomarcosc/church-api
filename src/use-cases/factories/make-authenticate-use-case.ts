import { KyselyUsersRepository } from "@/repositories/kysely/kysely-users-repository";
import { AuthenticateUseCase } from "../authenticate/authenticate";

export function makeAuthenticateUseCase() {
  const usersRepository = new KyselyUsersRepository();
  const authUseCase = new AuthenticateUseCase(usersRepository);

  return authUseCase;
}
