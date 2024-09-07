import { randomUUID } from "node:crypto";
import { db } from "@/database";
import bcrypt from "bcrypt";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function createUserUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  if (user) {
    throw new Error("User already exists");
  }

  await db
    .insertInto("users")
    .values({ id: randomUUID(), email, name, password: hashedPassword })
    .executeTakeFirst();
}
