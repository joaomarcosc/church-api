import type { FastifyInstance } from "fastify";
import { MemberController } from "./controller/member";

export async function appRoutes(app: FastifyInstance) {
  const memberController = new MemberController();

  // Private Routes
  app.addHook("preHandler", app.authenticate);
  app.post("/users/create", memberController.create);
}
