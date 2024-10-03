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

export const applicationUpdateBodySchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email("invalid email format").optional(),
    password: z.string().min(6, "password must be at least 6 characters").optional(),
    confirmPassword: z.string().min(6, "password must be at least 6 characters").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirm does not match with password",
    path: ["confirm_password"],
  });

const applicationUpdateParamsSchema = z.object({
  id: z
    .string({
      required_error: "id is required",
    })
    .min(1, { message: "id is required" }),
});

const applicationUpdateSchema = z.intersection(applicationUpdateBodySchema, applicationUpdateParamsSchema);

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

// create
export type CreateApplicationInput = z.infer<typeof applicationCreateSchema>;

// authenticate
export type LoginApplicationInput = z.infer<typeof applicationLoginSchema>;

// update
export type UpdateApplicationInput = z.infer<typeof applicationUpdateSchema>;
export type UpdateBodyApplicationInput = z.infer<typeof applicationUpdateBodySchema>;
export type UpdateParamsApplicationInput = z.infer<typeof applicationUpdateParamsSchema>;

export const applicationCreateJsonSchema = {
  body: zodToJsonSchema(applicationCreateSchema),
  tags: swaggerTagsGroups.applications,
};

export const applicationLoginJsonSchema = {
  body: zodToJsonSchema(applicationLoginSchema),
  tags: swaggerTagsGroups.applications,
};

export const applicationUpdateJsonSchema = {
  body: zodToJsonSchema(applicationUpdateSchema),
  params: zodToJsonSchema(applicationUpdateParamsSchema),
  tags: swaggerTagsGroups.applications,
};
