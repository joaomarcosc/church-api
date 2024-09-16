import { type Kysely, sql } from "kysely";
import type { Visitors } from "kysely-codegen";

export async function up(db: Kysely<Visitors>): Promise<void> {
  await db.schema
    .createTable("visitors")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("phone", "varchar", (col) => col.notNull())
    .addColumn("visitDates", sql`date[]`, (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("churchId", "uuid", (col) => col.unique().references("church.id").onDelete("cascade").notNull())
    .execute();

  await db.schema.createIndex("visitors_church_id_index").on("members").column("churchId").execute();
}

export async function down(db: Kysely<Visitors>): Promise<void> {
  await db.schema.dropTable("visitors").execute();
}
