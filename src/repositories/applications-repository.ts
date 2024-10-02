import type { CreateApplicationInput } from "@/schemas/applications";
import type { Selectable } from "kysely";
import type { Applications } from "kysely-codegen";

export interface ApplicationsRepository {
  create(data: Omit<CreateApplicationInput, "confirm_password">): Promise<Selectable<Applications> | undefined>;
  findByEmail(email: string): Promise<Selectable<Applications> | undefined>;
}
