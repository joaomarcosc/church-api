import { db } from "@/database";
import bcrypt from "bcrypt";

interface LoginUserUseCaseRequest {
  email: string;
  password: string;
}

export async function loginUserUseCase({ email, password }: LoginUserUseCaseRequest) {
  const user = await db.selectFrom("users").selectAll().where("email", "=", email).executeTakeFirst();

  const isValidPassword = await bcrypt.compare(password, user?.password ?? "");

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }
}
