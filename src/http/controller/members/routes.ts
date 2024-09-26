import { createMemberSchema, getMemberProfileSchema, searchMemberSchema } from "@/schemas/member";
import type { FastifyInstance } from "fastify";
import { MemberController } from "./member";

export async function memberRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  const memberController = new MemberController();

  app.post(
    "/member/create",
    {
      schema: {
        body: createMemberSchema,
        security: [{ bearerAuth: [] }],
        tags: ["Members"],
      },
    },
    memberController.create,
  );

  app.get(
    "/member/search",
    {
      schema: {
        querystring: searchMemberSchema,
        security: [{ bearerAuth: [] }],
        tags: ["Members"],
      },
    },
    memberController.searchManyMembers,
  );

  app.get(
    "/member/profile/:memberId",
    {
      schema: {
        params: getMemberProfileSchema,
        security: [{ bearerAuth: [] }],
        tags: ["Members"],
      },
    },
    memberController.getMemberProfile,
  );
}
