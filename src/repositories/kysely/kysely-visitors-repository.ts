import { db } from "@/database";
import { randomUUID } from "node:crypto";
import type { CreateVisitorParams, FindByIdParams, FindByNameParams, VisitorRepository } from "../visitors-repository";

export class KyselyVisitorsRepository implements VisitorRepository {
  async create(data: CreateVisitorParams) {
    const visitor = await db
      .insertInto("visitors")
      .values({ id: randomUUID(), ...data })
      .returningAll()
      .executeTakeFirst();

    return visitor;
  }

  async findByName(data: FindByNameParams) {
    const visitor = await db.selectFrom("visitors").where("name", "=", data.name).selectAll().executeTakeFirst();

    return visitor;
  }

  async findById(data: FindByIdParams) {
    const visitor = await db.selectFrom("visitors").where("name", "=", data.id).selectAll().executeTakeFirst();

    return visitor;
  }
}
