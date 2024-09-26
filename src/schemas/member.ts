import { z } from "zod";
import {
  conflictErrorSchema,
  internalServerErrorSchema,
  unauthorizedErrorSchema,
  zodValidationErrorSchema,
} from "./errors";

export const memberSchema = z.object({
  address: z.string(),
  birthDate: z.date(),
  churchId: z.string(),
  createdAt: z.date(),
  id: z.string(),
  joinDate: z.date(),
  name: z.string(),
  phone: z.string(),
  updatedAt: z.date(),
});

export const createMemberSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  birthDate: z.coerce.date(),
  joinDate: z.coerce.date(),
});

export const createMemberResponseSchema = z.object({
  message: z.string(),
});

export const searchMemberSchema = z.object({
  query: z.string().default(""),
  order: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().refine((page) => page >= 1, {
    path: ["page"],
    message: "page must be greater than equal to 1",
  }),
  perPage: z.coerce.number().refine((perPage) => perPage >= 1, {
    path: ["perPage"],
    message: "perPage must be greater than equal to 1",
  }),
});

export const searchMemberResponseSchema = z.object({
  members: z.array(memberSchema),
});

export const getMemberProfileSchema = z.object({
  memberId: z.string(),
});

export const schemaMemberCreate = {
  tags: ["Members"],
  body: createMemberSchema,
  security: [{ bearerAuth: [] }],
  response: {
    201: createMemberResponseSchema,
    400: zodValidationErrorSchema,
    401: unauthorizedErrorSchema,
    409: conflictErrorSchema,
    500: internalServerErrorSchema,
  },
};

export const schemaMemberSearch = {
  tags: ["Members"],
  querystring: searchMemberSchema,
  security: [{ bearerAuth: [] }],
  response: {
    200: searchMemberResponseSchema,
    400: zodValidationErrorSchema,
    401: unauthorizedErrorSchema,
    500: internalServerErrorSchema,
  },
};

export const schemaGetMemberProfile = {
  params: getMemberProfileSchema,
  security: [{ bearerAuth: [] }],
  tags: ["Members"],
  response: {
    200: memberSchema,
    400: zodValidationErrorSchema,
    401: unauthorizedErrorSchema,
    500: internalServerErrorSchema,
  },
};
