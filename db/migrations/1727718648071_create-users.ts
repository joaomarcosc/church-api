import { type Kysely, sql } from "kysely";
import type { DB } from "kysely-codegen";

export async function up(db: Kysely<DB>): Promise<void> {
  // TODO: if can add new role, u need create a new migration
  await db.schema.createType("rolestype").asEnum(["ADMIN", "COMMON_USER", "FINANCE"]).execute();

  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey().unique().notNull())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("phone", "varchar", (col) => col.notNull())
    .addColumn("address", "varchar", (col) => col.notNull())
    .addColumn("birthDate", "date", (col) => col.notNull())
    .addColumn("joinDate", "date", (col) => col.notNull())
    .addColumn("role", sql`rolestype`, (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("applicationId", "uuid", (col) => col.references("applications.id").onDelete("cascade").notNull())
    .execute();

  await db.schema.createIndex("users_application_id_index").on("users").column("applicationId").execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("users").execute();
}
