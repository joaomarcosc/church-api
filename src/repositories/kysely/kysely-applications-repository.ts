import { db } from "@/database";
import type { CreateApplicationInput } from "@/schemas/applications";
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
  async create(data: Omit<CreateApplicationInput, "confirm_password">) {
    const application = await db.insertInto("applications").values(data).returningAll().executeTakeFirst();

    return application;
  }
}
