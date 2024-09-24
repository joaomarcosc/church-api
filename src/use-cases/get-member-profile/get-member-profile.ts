import type { ChurchRepository } from "@/repositories/church-repository";
import type { Member, MembersRepository } from "@/repositories/member-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface GetMemberProfileUseCaseRequest {
  memberId: string;
  churchId: string;
}

interface GetMemberProfileUseCaseResponse {
  member: Member;
}

export class GetMemberProfileUseCase {
  constructor(
    private membersRepository: MembersRepository,
    private churchRepository: ChurchRepository,
  ) {}

  async execute(data: GetMemberProfileUseCaseRequest): Promise<GetMemberProfileUseCaseResponse> {
    const church = await this.churchRepository.findById({ id: data.churchId });

    if (!church) {
      throw new ResourceNotFoundError();
    }

    const member = await this.membersRepository.findById({
      memberId: data.memberId,
    });

    if (!member) {
      throw new ResourceNotFoundError();
    }

    return {
      member,
    };
  }
}
