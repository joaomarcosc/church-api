import type { CreateUserInput } from "@/schemas/users";
import type { Selectable } from "kysely";
import type { Users } from "kysely-codegen";

export interface UsersRepository {
  create(data: Omit<CreateUserInput, "confirmPassword">): Promise<Selectable<Users> | undefined>;
  findByEmail(data: string): Promise<Selectable<Users> | undefined>;
}
