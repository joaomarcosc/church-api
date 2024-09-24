import { execSync } from "node:child_process";
import type { Environment } from "vitest/environments";

import { db } from "../src/database";

export default (<Environment>{
  name: "kysely",
  transformMode: "ssr",
  async setup() {
    try {
      execSync("npx kysely migrate:latest && npx kysely seed:run", { stdio: "inherit" });
      console.log("Database migrations and seeds applied successfully.");
    } catch (error) {
      console.error("Failed to run migrations or seeds:", error);
      throw error;
    }

    return {
      async teardown() {
        await db.schema.dropSchema("test_end_to_end").ifExists().execute();
        await db.destroy();
        console.log("Database connection closed.");
      },
    };
  },
});
