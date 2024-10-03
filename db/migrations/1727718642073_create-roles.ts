import { type Kysely, sql } from "kysely";
import type { DB } from "kysely-codegen";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("roles")
    .addColumn("id", "uuid", (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey().unique().notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("applicationId", "uuid", (col) => col.references("applications.id").onDelete("cascade").notNull())
    .execute();

  await db.schema.createIndex("roles_application_id_index").on("roles").column("applicationId").execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("roles").execute();
}
