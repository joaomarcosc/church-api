import { db } from "@/database";
import type { CreateApplicationInput, UpdateApplicationInput } from "@/schemas/applications";
import type { ApplicationsRepository } from "../applications-repository";

export class KyselyApplicationsRepository implements ApplicationsRepository {
  async findByEmail(email: string) {
    const application = await db
      .selectFrom("applications")
      .where("applications.email", "=", email)
      .selectAll()
      .executeTakeFirst();

    return application;
  }
  async create(data: Omit<CreateApplicationInput, "confirmPassword">) {
    const application = await db.insertInto("applications").values(data).returningAll().executeTakeFirst();

    return application;
  }

  async update(data: UpdateApplicationInput) {
    const { id, ...body } = data;

    const application = await db
      .updateTable("applications")
      .set(body)
      .where("applications.id", "=", id)
      .returningAll()
      .executeTakeFirst();

    return application;
  }

  async findById(id: string) {
    const application = await db
      .selectFrom("applications")
      .where("applications.id", "=", id)
      .selectAll()
      .executeTakeFirst();

    return application;
  }
}
