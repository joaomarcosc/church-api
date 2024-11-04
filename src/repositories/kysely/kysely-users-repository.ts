import { db } from "@/database";
import type { CreateUserInput } from "@/schemas/users";
import type { Selectable } from "kysely";
import type { Users } from "kysely-codegen";
import type { UsersRepository } from "../users-repository";

export class KyselyUsersRepository implements UsersRepository {
  async create(data: Omit<CreateUserInput, "confirmPassword">): Promise<Selectable<Users> | undefined> {
    const user = await db.insertInto("users").values(data).returningAll().executeTakeFirst();

    return user;
  }

  async findByEmail(data: string): Promise<Selectable<Users> | undefined> {
    const user = await db.selectFrom("users").where("users.email", "=", data).selectAll().executeTakeFirst();

    return user;
  }
}
