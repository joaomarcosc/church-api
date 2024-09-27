import { z } from "zod";

export const visitorSchema = z.object({
  churchId: z.string(),
  createdAt: z.date(),
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  updatedAt: z.date(),
  visitDate: z.date(),
});

export const createVisitorSchema = z.object({
  name: z.string(),
  phone: z.string(),
  visitDate: z.coerce.date(),
});

export const schemaCreateVisitor = {
  tags: ["Visitors"],
  body: createVisitorSchema,
  security: [{ bearerAuth: [] }],
};
