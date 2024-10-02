import { applicationCreateJsonSchema } from "@/schemas/applications";
import type { FastifyInstance } from "fastify";
import { ApplicationController } from "./applications";

export async function applicationsRoutes(app: FastifyInstance) {
  const applicationsController = new ApplicationController();

  app.post("create", { schema: applicationCreateJsonSchema }, applicationsController.create);
}
