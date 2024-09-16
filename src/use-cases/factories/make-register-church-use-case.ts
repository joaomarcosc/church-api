import { KyselyChurchRepository } from "@/repositories/kysely/kysely-church-repository";
import { RegisterChurchUseCase } from "../register-church/register-church";

export function makeRegisterChurchUseCase() {
  const churchRepository = new KyselyChurchRepository();
  const registerChurchUseCase = new RegisterChurchUseCase(churchRepository);

  return registerChurchUseCase;
}
