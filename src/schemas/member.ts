import { z } from "zod";

export const memberSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is not valid",
    })
    .email(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  birthDate: z.date(),
  joinDate: z.date(),
  churchId: z.string(),
});
