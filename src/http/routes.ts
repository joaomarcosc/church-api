import type { FastifyInstance } from "fastify";
import { ChurchController } from "./controller/church";
import { MemberController } from "./controller/member";

export async function appRoutes(app: FastifyInstance) {
  const memberController = new MemberController();
  const churchController = new ChurchController();

  app.post("/church/session", churchController.authenticate);

  // Private Routes
  app.post(
    "/member/create",
    { preHandler: [app.authenticate] },
    memberController.create,
  );
}
