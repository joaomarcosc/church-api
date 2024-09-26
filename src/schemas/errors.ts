import { z } from "zod";

export const internalServerErrorSchema = z.object({
  description: z.string().default("Internal Server Error"),
  type: z.string().default("object"),
  properties: z.object({
    message: z.string(),
  }),
});

export const unauthorizedErrorSchema = z.object({
  message: z.string(),
});

export const conflictErrorSchema = z.object({
  message: z.string(),
});

export const zodValidationErrorSchema = z.object({
  message: z.string(),
  issues: z.object({
    _errors: z.array(z.string()),
  }),
});
