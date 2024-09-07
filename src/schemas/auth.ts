import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Required field" }).email("This is not valid email"),
  password: z.string().min(1, { message: "Required field" }),
});
