import type { FastifyInstance } from "fastify";
import { authController, logoutController } from "./controller/auth";
import { createUserController, listAllUsersController } from "./controller/user";

export async function appRoutes(app: FastifyInstance) {
  // Auth routes
  app.post("/session", authController);
  app.post("/logout", logoutController);

  // Users Routes
  app.post("/users/create", createUserController);
  app.get(
    "/users/list",
    {
      preHandler: [app.authenticate],
    },
    listAllUsersController,
  );
}
