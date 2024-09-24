import { z } from "zod";

export const createMemberSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  birthDate: z.coerce.date(),
  joinDate: z.coerce.date(),
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

export const getMemberProfileSchema = z.object({
  memberId: z.string(),
});
