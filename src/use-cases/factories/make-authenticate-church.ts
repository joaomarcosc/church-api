import { KyselyChurchRepository } from "@/repositories/kysely/kysely-church-repository";
import { AuthenticateChurchUseCase } from "../authenticate-church/authenticate-church";

export function makeAuthenticateChurchUseCase() {
  const churchRepository = new KyselyChurchRepository();
  const authenticateChurchUseCase = new AuthenticateChurchUseCase(churchRepository);

  return authenticateChurchUseCase;
}
