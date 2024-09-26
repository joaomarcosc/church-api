import { authenticateChurchSchema } from "@/schemas/church";
import type { FastifyInstance } from "fastify";
import { ChurchController } from "./church";

export async function churchRoutes(app: FastifyInstance) {
  const churchController = new ChurchController();

  app.post(
    "/church/session",
    {
      schema: {
        body: authenticateChurchSchema,
        tags: ["Churchs"],
      },
    },
    churchController.authenticate,
  );
}
