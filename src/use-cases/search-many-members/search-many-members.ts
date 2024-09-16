import type { ChurchRepository } from "@/repositories/church-repository";
import type { Member, MembersRepository } from "@/repositories/member-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface SearchManyMembersUseCaseRequest {
  churchId: string;
  query: string;
  perPage: number;
  page: number;
  order: "asc" | "desc";
}

interface SearchManyMembersUseCaseResponse {
  members?: Member[];
}

export class SearchManyMembersUseCase {
  constructor(
    private membersRepository: MembersRepository,
    private churchRepository: ChurchRepository,
  ) {}

  async execute({
    churchId,
    order,
    page,
    perPage,
    query,
  }: SearchManyMembersUseCaseRequest): Promise<SearchManyMembersUseCaseResponse> {
    const church = await this.churchRepository.findById({ id: churchId });

    if (!church) {
      throw new ResourceNotFoundError();
    }

    const members = await this.membersRepository.searchMany({
      churchId,
      order,
      page,
      perPage,
      query,
    });

    return {
      members,
    };
  }
}
