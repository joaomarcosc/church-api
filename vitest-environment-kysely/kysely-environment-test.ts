import type { Environment } from "vitest/environments";
import "dotenv/config";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

import { db } from "../src/database";

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("Need insert DATABASE_URL on .env file");
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set("schema", schema);

    return url.toString();
}

export default <Environment>{
    name: "kysely",
    transformMode: "ssr",
    async setup() {
        const schema = `test_${randomUUID()}`;
        const databaseURL = generateDatabaseURL(schema);

        process.env.DATABASE_URL = databaseURL;

        try {
            execSync("npx kysely migrate:latest && npx kysely seed:run", {
                stdio: "inherit",
            });
            console.log("Database migrations and seeds applied successfully.");
        } catch (error) {
            console.error("Failed to run migrations or seeds:", error);
            throw error;
        }
        return {
            async teardown() {
                console.log(`Dropping schema ${schema}...`);
                if (schema) {
                }
                await db.schema.dropSchema(schema).ifExists().execute();
                await db.destroy();
                console.log("Database connection closed.");
            },
        };
    },
};
