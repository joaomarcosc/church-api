import { type Kysely, sql } from "kysely";
import type { DB } from "kysely-codegen";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("applications")
    .addColumn("id", "uuid", (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey().unique().notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("applications").execute();
}