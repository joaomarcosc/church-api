import { swaggerTagsGroups } from "@/utils/swagger-tags-group";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const applicationCreateSchema = z
  .object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("invalid email format"),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, "password must be at least 6 characters"),
    confirm_password: z
      .string({
        required_error: "confirm password is required",
      })
      .min(6, "password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "confirm does not match with password",
    path: ["confirm_password"],
  });

export const applicationLoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email("invalid email format"),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, "password must be at least 6 characters"),
});

export type CreateApplicationInput = z.infer<typeof applicationCreateSchema>;
export type LoginApplicationInput = z.infer<typeof applicationLoginSchema>;

export const applicationCreateJsonSchema = {
  body: zodToJsonSchema(applicationCreateSchema),
  tags: swaggerTagsGroups.applications,
};

export const applicationLoginJsonSchema = {
  body: zodToJsonSchema(applicationLoginSchema),
  tags: swaggerTagsGroups.applications,
};
