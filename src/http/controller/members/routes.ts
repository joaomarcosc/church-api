import type { FastifyInstance } from "fastify";
import { MemberController } from "./member";

export async function memberRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  const memberController = new MemberController();

  app.post("/member/create", memberController.create);
  app.get("/member/search", memberController.searchManyMembers);
  app.get("/member/profile/:memberId", memberController.getMemberProfile);
}
