import { z } from "zod";

export const createMemberSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  birthDate: z.coerce.date(),
  joinDate: z.coerce.date(),
});
