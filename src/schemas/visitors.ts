import { z } from "zod";

export const createVisitorSchema = z.object({
  name: z.string(),
  phone: z.string(),
  visitDate: z.coerce.date(),
});
