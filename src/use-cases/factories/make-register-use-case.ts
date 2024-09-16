import { KyselyChurchRepository } from "@/repositories/kysely/kysely-church-repository";
import { KyselyMembersRepository } from "@/repositories/kysely/kysely-members-repository";
import { RegisterMemberUseCase } from "../register-member/register-member";

export function makeRegisterUseCase() {
  const membersRepository = new KyselyMembersRepository();
  const churchRepository = new KyselyChurchRepository();
  const registerUseCase = new RegisterMemberUseCase(membersRepository, churchRepository);

  return registerUseCase;
}
