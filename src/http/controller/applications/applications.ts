import type { CreateApplicationInput } from "@/schemas/applications";
import { ResourceAlreadyExists } from "@/use-cases/errors/resource-already-exists";
import { makeCreateApplicationUseCase } from "@/use-cases/factories/make-create-application-use-case";
import { HTTP_STATUS_CODE } from "@/utils/status-codes";
import type { FastifyReply, FastifyRequest } from "fastify";

export class ApplicationController {
  async create(
    req: FastifyRequest<{
      Body: CreateApplicationInput;
    }>,
    reply: FastifyReply,
  ) {
    const { email, name, password, confirm_password } = req.body;

    try {
      const createApplicationUseCase = makeCreateApplicationUseCase();

      await createApplicationUseCase.execute({
        email,
        name,
        password,
        confirm_password,
      });

      return reply.status(HTTP_STATUS_CODE.Created).send({
        message: "Application create with success",
      });
    } catch (error) {
      if (error instanceof ResourceAlreadyExists) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      throw error;
    }
  }
}
