import type { CreateUserParams, FindByEmailParams, FindByIdParams, User, UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create(data: CreateUserParams) {
    const user = { ...data, id: "123", createdAt: new Date(), updatedAt: new Date() };

    this.users.push(user);

    return user;
  }

  async findByEmail(data: FindByEmailParams) {
    const user = this.users.find((item) => item.email === data.email);

    return user;
  }

  async findById(data: FindByIdParams) {
    const user = this.users.find((item) => item.id === data.userId);

    return user;
  }
}
