import type { FastifyInstance } from "fastify";
import { churchRoutes } from "./controller/church/routes";
import { memberRoutes } from "./controller/members/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(churchRoutes);
  app.register(memberRoutes);
}
