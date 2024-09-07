import type { FastifyInstance } from "fastify";
import { loginController, logoutController } from "./controller/auth";
import {
  createUserController,
  listAllUsersController,
} from "./controller/user";

export async function appRoutes(app: FastifyInstance) {
  // Auth routes
  app.post("/login", loginController);
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
