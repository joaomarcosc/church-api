import { randomUUID } from "node:crypto";
import { db } from "@/database";
import type {
  CreateMemberParams,
  FindByIdParams,
  FindByNameParams,
  MembersRepository,
  SearchManyParams,
} from "../member-repository";

export class KyselyMembersRepository implements MembersRepository {
  async create(data: CreateMemberParams) {
    const member = await db
      .insertInto("members")
      .values({ id: randomUUID(), ...data })
      .returningAll()
      .executeTakeFirst();

    return member;
  }

  async findByName(data: FindByNameParams) {
    const member = await db.selectFrom("members").selectAll().where("name", "=", data.name).executeTakeFirst();

    return member;
  }

  async findById(data: FindByIdParams) {
    const member = await db.selectFrom("members").selectAll().where("id", "=", data.memberId).executeTakeFirst();

    return member;
  }

  async searchMany(data: SearchManyParams) {
    const members = await db
      .selectFrom("members")
      .selectAll()
      .where(({ eb }) => eb.and([eb("churchId", "=", data.churchId), eb("name", "like", `%${data.query}`)]))
      .orderBy("name", data.order)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();

    return members;
  }
}
