import { userCreateJsonSchema } from "@/schemas/users";
import type { FastifyInstance } from "fastify";
import { UsersController } from "./users";

export async function usersRoutes(app: FastifyInstance) {
  const usersController = new UsersController();

  app.post("create", { schema: userCreateJsonSchema }, usersController.create);
}
