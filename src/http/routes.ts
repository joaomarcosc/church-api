import type { FastifyInstance } from "fastify";
import { applicationsRoutes } from "./controller/applications/routes";
import { refreshTokenRoutes } from "./controller/refresh-token/routes";
import { usersRoutes } from "./controller/users/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(refreshTokenRoutes, {
    prefix: "/refresh/token/",
  });
  app.register(applicationsRoutes, {
    prefix: "/applications/",
  });
  app.register(usersRoutes, {
    prefix: "/users/",
  });
}
