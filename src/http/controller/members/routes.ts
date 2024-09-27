import {} from "@/schemas/errors";
import { schemaGetMemberProfile, schemaMemberCreate, schemaMemberSearch } from "@/schemas/member";
import type { FastifyInstance } from "fastify";
import { MemberController } from "./member";

export async function memberRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  const memberController = new MemberController();

  app.post(
    "/member/create",
    {
      schema: schemaMemberCreate,
    },
    memberController.create,
  );

  app.get(
    "/member/search",
    {
      schema: schemaMemberSearch,
    },
    memberController.searchManyMembers,
  );

  app.get(
    "/member/profile/:memberId",
    {
      schema: schemaGetMemberProfile,
    },
    memberController.getMemberProfile,
  );
}
