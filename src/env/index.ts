import { config } from "dotenv";

import z from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
}

if (process.env.NODE_ENV !== "test") {
  config();
}

const databaseSchemas = {
  DATABASE_HOST: z.string().min(1, { message: "DATABASE_HOST is required" }),
  DATABASE_USERNAME: z
    .string()
    .min(1, { message: "DATABASE_USERNAME is required" }),
  DATABASE_PASSWORD: z
    .string()
    .min(1, { message: "DATABASE_PASSWORD is required" }),
  DATABASE_NAME: z.string().min(1, { message: "DATABASE_NAME is required" }),
  DATABASE_PORT: z.coerce.number().default(5432),
};

const envSchema = z.object({
  ...databaseSchemas,
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(["development", "staging", "test", "production"])
    .default("development"),
  SECRET_KEY: z.string().min(1),
});

/*
If you don't want Zod to throw errors when validation fails, use .safeParse. This method returns an object containing either the successfully parsed data or a ZodError instance containing detailed information about the validation problems. https://zod.dev/?id=safeparse
*/
const _env = envSchema.safeParse(process.env);

if (_env.error) {
  console.error("⚠️ invalid environment variables", _env.error.format());

  throw new Error("invalid environment variables");
}

export const env = _env.data;
