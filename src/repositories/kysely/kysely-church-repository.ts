import { randomUUID } from "node:crypto";
import { db } from "@/database";
import type {
  Church,
  ChurchRepository,
  CreateChurchParams,
  FindByEmailParams,
  FindByIdParams,
} from "../church-repository";

export class KyselyChurchRepository implements ChurchRepository {
  async create(data: CreateChurchParams) {
    const church = await db
      .insertInto("church")
      .values({ id: randomUUID(), ...data })
      .returningAll()
      .executeTakeFirst();

    return church;
  }

  async findByEmail(data: FindByEmailParams) {
    const church = await db.selectFrom("church").where("church.email", "=", data.email).selectAll().executeTakeFirst();

    return church;
  }

  async findById(data: FindByIdParams): Promise<Church | undefined> {
    const church = await db.selectFrom("church").where("church.id", "=", data.id).selectAll().executeTakeFirst();

    return church;
  }
}
