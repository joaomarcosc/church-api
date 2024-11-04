import { randomUUID } from "node:crypto";
import type { CreateUserInput } from "@/schemas/users";
import type { Selectable } from "kysely";
import type { Rolestype, Users } from "kysely-codegen";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  users: Selectable<Users>[] = [];

  async create(data: Omit<CreateUserInput, "confirmPassword">): Promise<Selectable<Users> | undefined> {
    const user: Selectable<Users> = {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
      ...data,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(data: string): Promise<Selectable<Users> | undefined> {
    const user = this.users.find((user) => user.email === data);

    return user;
  }

  async findUserByRoleAndApplication(role: Rolestype, app: string): Promise<Selectable<Users> | undefined> {
    const user = this.users.find((user) => user.role === role && user.applicationId === app);

    return user;
  }
}
