import { KyselyChurchRepository } from "@/repositories/kysely/kysely-church-repository";
import { KyselyVisitorsRepository } from "@/repositories/kysely/kysely-visitors-repository";
import { RegisterVisitorsUseCase } from "../register-visitor/register-visitor";

export function makeRegisterVisitorUseCase() {
  const visitorRepository = new KyselyVisitorsRepository();
  const churchRepository = new KyselyChurchRepository();
  const registerVisitorUseCase = new RegisterVisitorsUseCase(visitorRepository, churchRepository);

  return registerVisitorUseCase;
}
