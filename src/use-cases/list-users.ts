import { db } from "@/database";

export async function listAllUsersUseCase() {
  const user = await db.selectFrom("users").selectAll().execute();

  return user;
}
