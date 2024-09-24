import { KyselyChurchRepository } from "@/repositories/kysely/kysely-church-repository";
import { KyselyMembersRepository } from "@/repositories/kysely/kysely-members-repository";
import { GetMemberProfileUseCase } from "../get-member-profile/get-member-profile";

export function makeGetMemberProfileUseCase() {
  const membersRepository = new KyselyMembersRepository();
  const churchRepository = new KyselyChurchRepository();
  const getMemberProfile = new GetMemberProfileUseCase(membersRepository, churchRepository);

  return getMemberProfile;
}
