import { KyselyChurchRepository } from "@/repositories/kysely/kysely-church-repository";
import { KyselyMembersRepository } from "@/repositories/kysely/kysely-members-repository";
import { GetMemberProfileUseCase } from "../get-member-profile/get-member-profile";

export function makeSearchManyMembersUseCase() {
  const membersRepository = new KyselyMembersRepository();
  const churchRepository = new KyselyChurchRepository();
  const getMemberProfileUseCase = new GetMemberProfileUseCase(membersRepository, churchRepository);

  return getMemberProfileUseCase;
}
