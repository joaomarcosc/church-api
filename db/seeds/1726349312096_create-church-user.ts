import bcrypt from "bcrypt";
import type { Kysely } from "kysely";
import type { DB } from "kysely-codegen";

export async function seed(db: Kysely<DB>): Promise<void> {
  const church = await db
    .selectFrom("church")
    .where("church.id", "=", "5e3e5f06-33c3-44dc-a24a-31934b578394")
    .selectAll()
    .executeTakeFirst();

  if (!church) {
    await db
      .insertInto("church")
      .values({
        email: "admin@umadem.com",
        password: await bcrypt.hash("aP37IY_4#YBN", 6),
        id: "5e3e5f06-33c3-44dc-a24a-31934b578394",
        name: "Assembleia de Deus Mucuge",
        phone: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .execute();
  }
}
