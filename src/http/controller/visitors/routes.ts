import { schemaCreateVisitor } from "@/schemas/visitors";
import type { FastifyInstance } from "fastify";
import { VisitorsController } from "./visitors";

export async function visitorsRoutes(app: FastifyInstance) {
  app.addHook("preValidation", app.authenticate);

  const visitorsController = new VisitorsController();

  app.post(
    "/visitors/create",
    {
      schema: schemaCreateVisitor,
    },
    visitorsController.create,
  );
}
