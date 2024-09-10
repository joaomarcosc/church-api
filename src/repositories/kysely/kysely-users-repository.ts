import { randomUUID } from "node:crypto";
import { db } from "@/database";
import type { CreateUserParams, UsersRepository } from "../users-repository";

export class KyselyUsersRepository implements UsersRepository {
  async create(data: CreateUserParams) {
    const user = await db
      .insertInto("users")
      .values({ id: randomUUID(), ...data })
      .returningAll()
      .executeTakeFirst();

    return user;
  }

  async findByEmail(email: string) {
    const user = await db.selectFrom("users").selectAll().where("email", "=", email).executeTakeFirst();

    return user;
  }
}
