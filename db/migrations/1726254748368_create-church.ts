import { type Kysely, sql } from "kysely";
import type { Church } from "kysely-codegen";

export async function up(db: Kysely<Church>): Promise<void> {
  await db.schema
    .createTable("church")
    .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("phone", "varchar", (col) => col.notNull())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<Church>): Promise<void> {
  await db.schema.dropTable("church").execute();
}
