import type { FastifyInstance } from "fastify";
import { VisitorsController } from "./visitors";

export async function visitorsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  const visitorsController = new VisitorsController();

  app.post("/visitors/create", visitorsController.create);
}
