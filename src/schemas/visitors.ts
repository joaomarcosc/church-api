import { z } from "zod";

export const createVisitorSchema = z.object({
  name: z.string(),
  phone: z.string(),
  visitDates: z.array(z.coerce.date()),
});
