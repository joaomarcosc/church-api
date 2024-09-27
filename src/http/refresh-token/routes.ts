import type { FastifyInstance } from "fastify";
import { RefreshTokenController } from "./refresh-token";

export async function refreshTokenRoutes(app: FastifyInstance) {
  const refreshTokenController = new RefreshTokenController();

  app.post("/refresh/token", refreshTokenController.generate);
}
