import type { User, UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private users: UsersRepository) {}

  async axecute(userId: string): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.users.findById({ userId });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
