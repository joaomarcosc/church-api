import { swaggerTagsGroups } from "@/utils/swagger-tags-group";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const userCreateSchema = z
  .object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("invalid email format"),
    birthDate: z.date({
      required_error: "birthDate is required",
    }),
    joinDate: z.date({
      required_error: "joinDate is required",
    }),
    role: z.enum(["ADMIN", "COMMON_USER", "FINANCE"], { required_error: "role is required" }),
    applicationId: z.string({ required_error: "applicationId is required" }),
    address: z.string({ required_error: "address is required" }),
    phone: z.string({ required_error: "address is required" }),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, "password must be at least 6 characters"),
    confirmPassword: z
      .string({
        required_error: "confirm password is required",
      })
      .min(6, "password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirm does not match with password",
    path: ["confirm_password"],
  });

// create
export type CreateUserInput = z.infer<typeof userCreateSchema>;

// Schemas
export const userCreateJsonSchema = {
  body: zodToJsonSchema(userCreateSchema),
  tags: swaggerTagsGroups.applications,
};
