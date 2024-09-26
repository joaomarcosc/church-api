import { z } from "zod";
import { internalServerErrorSchema, unauthorizedErrorSchema, zodValidationErrorSchema } from "./errors";

export const churchSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
});

export const authenticateChurchSchema = z.object({
  email: z.string().min(1, { message: "Required field" }).email("This is not valid email"),
  password: z.string().min(1, { message: "Required field" }),
});

export const authenticateChurchResponseSchema = z.object({
  token: z.string().min(1, { message: "Required field" }),
});

export const schemaChurchSession = {
  body: authenticateChurchSchema,
  tags: ["Church"],
  response: {
    200: authenticateChurchResponseSchema,
    400: zodValidationErrorSchema,
    401: unauthorizedErrorSchema,
    500: internalServerErrorSchema,
  },
};
