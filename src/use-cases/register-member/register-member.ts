import type { ChurchRepository } from "@/repositories/church-repository";
import type { CreateMemberParams, Member, MembersRepository } from "@/repositories/member-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

interface RegisterMemberUseCaseRequest extends CreateMemberParams {}

interface RegisterMemberUseCaseResponse {
  member?: Member;
}

export class RegisterMemberUseCase {
  constructor(
    private membersRepository: MembersRepository,
    private churchRepository: ChurchRepository,
  ) {}
  async execute(data: RegisterMemberUseCaseRequest): Promise<RegisterMemberUseCaseResponse> {
    const hasMember = Boolean(await this.membersRepository.findByName({ name: data.name }));

    if (hasMember) {
      throw new UserAlreadyExistsError();
    }

    const churchById = await this.churchRepository.findById({ id: data.churchId });

    if (!churchById) {
      throw new ResourceNotFoundError();
    }

    const member = await this.membersRepository.create(data);

    return { member };
  }
}
