import { randomUUID } from "node:crypto";
import { db } from "@/database";
import type { CreateUserParams, FindByEmailParams, FindByIdParams, UsersRepository } from "../users-repository";

export class KyselyUsersRepository implements UsersRepository {
  async create(data: CreateUserParams) {
    const user = await db
      .insertInto("users")
      .values({ id: randomUUID(), ...data })
      .returningAll()
      .executeTakeFirst();

    return user;
  }

  async findByEmail(data: FindByEmailParams) {
    const user = await db.selectFrom("users").selectAll().where("email", "=", data.email).executeTakeFirst();

    return user;
  }

  async findById(data: FindByIdParams) {
    const user = await db.selectFrom("users").selectAll().where("id", "=", data.userId).executeTakeFirst();

    return user;
  }
}
