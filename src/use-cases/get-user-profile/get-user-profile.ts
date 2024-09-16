import type { Member, MembersRepository } from "@/repositories/member-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface GetMemberProfileUseCaseResponse {
  member: Member;
}

export class GetMemberProfileUseCase {
  constructor(private members: MembersRepository) {}

  async axecute(memberId: string): Promise<GetMemberProfileUseCaseResponse> {
    const member = await this.members.findById({ memberId });

    if (!member) {
      throw new ResourceNotFoundError();
    }

    return {
      member,
    };
  }
}
