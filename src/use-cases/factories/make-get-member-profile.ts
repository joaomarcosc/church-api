import { KyselyChurchRepository } from "@/repositories/kysely/kysely-church-repository";
import { KyselyMembersRepository } from "@/repositories/kysely/kysely-members-repository";
import { SearchManyMembersUseCase } from "../search-many-members/search-many-members";

export function makeSearchManyMembersUseCase() {
  const membersRepository = new KyselyMembersRepository();
  const churchRepository = new KyselyChurchRepository();
  const searchManyMembers = new SearchManyMembersUseCase(membersRepository, churchRepository);

  return searchManyMembers;
}
