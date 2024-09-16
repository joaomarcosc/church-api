import { type Kysely, sql } from "kysely";
import type { Members } from "kysely-codegen";

export async function up(db: Kysely<Members>): Promise<void> {
  await db.schema
    .createTable("members")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("phone", "varchar", (col) => col.notNull())
    .addColumn("address", "varchar", (col) => col.notNull())
    .addColumn("birthDate", "date", (col) => col.notNull())
    .addColumn("joinDate", "date", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("churchId", "uuid", (col) => col.unique().references("church.id").onDelete("cascade").notNull())
    .execute();

  await db.schema.createIndex("members_church_id_index").on("members").column("churchId").execute();
}

export async function down(db: Kysely<Members>): Promise<void> {
  await db.schema.dropTable("members").execute();
}
