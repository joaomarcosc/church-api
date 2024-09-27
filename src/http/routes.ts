import type { FastifyInstance } from "fastify";
import { churchRoutes } from "./controller/church/routes";
import { memberRoutes } from "./controller/members/routes";
import { visitorsRoutes } from "./controller/visitors/routes";
import { refreshTokenRoutes } from "./refresh-token/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(refreshTokenRoutes);
  app.register(churchRoutes);
  app.register(memberRoutes);
  app.register(visitorsRoutes);
}
