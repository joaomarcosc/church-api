import type { FastifyInstance } from "fastify";
import { ChurchController } from "./church";

export async function churchRoutes(app: FastifyInstance) {
  const churchController = new ChurchController();

  app.post("/church/session", churchController.authenticate);
}
