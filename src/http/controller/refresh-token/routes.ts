import { swaggerTagsGroups } from "@/utils/swagger-tags-group";
import type { FastifyInstance } from "fastify";
import { RefreshTokenController } from "./refresh-token";

export async function refreshTokenRoutes(app: FastifyInstance) {
  const refreshTokenController = new RefreshTokenController();

  app.post(
    "",
    {
      preValidation: [app.authenticate],
      schema: {
        tags: swaggerTagsGroups.authentication,
      },
    },
    refreshTokenController.generate,
  );
}
