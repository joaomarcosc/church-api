import type { CreateApplicationInput, UpdateApplicationInput } from "@/schemas/applications";
import type { Selectable } from "kysely";
import type { Applications } from "kysely-codegen";

export interface ApplicationsRepository {
  create(data: Omit<CreateApplicationInput, "confirmPassword">): Promise<Selectable<Applications> | undefined>;
  update(data: UpdateApplicationInput): Promise<Selectable<Applications> | undefined>;
  findByEmail(email: string): Promise<Selectable<Applications> | undefined>;
  findById(id: string): Promise<Selectable<Applications> | undefined>;
}
