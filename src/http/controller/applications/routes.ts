import { applicationCreateJsonSchema, applicationUpdateJsonSchema } from "@/schemas/applications";
import type { FastifyInstance } from "fastify";
import { ApplicationController } from "./applications";

export async function applicationsRoutes(app: FastifyInstance) {
  const applicationsController = new ApplicationController();

  app.post("create", { schema: applicationCreateJsonSchema }, applicationsController.create);
  app.post("update", { schema: applicationUpdateJsonSchema }, applicationsController.update);
}
