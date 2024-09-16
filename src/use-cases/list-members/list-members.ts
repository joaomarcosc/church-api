import type { ChurchRepository } from "@/repositories/church-repository";
import type { Member, MembersRepository } from "@/repositories/member-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface ListMembersUseCaseRequest {
  churchId: string;
  query: string;
  perPage: number;
  page: number;
  order: "asc" | "desc";
}

interface ListMembersUseCaseResponse {
  members?: Member[];
}

export class ListMembersUseCase {
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
  }: ListMembersUseCaseRequest): Promise<ListMembersUseCaseResponse> {
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
