import { z } from "zod";

export const churchSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
});

export const authenticateChurchSchema = z.object({
  email: z.string(),
  password: z.string(),
});
