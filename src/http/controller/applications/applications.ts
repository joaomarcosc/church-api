import type {
  CreateApplicationInput,
  UpdateBodyApplicationInput,
  UpdateParamsApplicationInput,
} from "@/schemas/applications";
import { ResourceAlreadyExists } from "@/use-cases/errors/resource-already-exists";
import { makeCreateApplicationUseCase } from "@/use-cases/factories/make-create-application-use-case";
import { makeUpdateApplicationUseCase } from "@/use-cases/factories/make-update-application-use-case";
import { HTTP_STATUS_CODE } from "@/utils/status-codes";
import type { FastifyReply, FastifyRequest } from "fastify";

export class ApplicationController {
  async create(
    req: FastifyRequest<{
      Body: CreateApplicationInput;
    }>,
    reply: FastifyReply,
  ) {
    const { email, name, password, confirmPassword } = req.body;

    try {
      const createApplicationUseCase = makeCreateApplicationUseCase();

      await createApplicationUseCase.execute({
        email,
        name,
        password,
        confirmPassword,
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

  // TODO: Need test this endpoint before continue
  async update(
    req: FastifyRequest<{
      Body: UpdateBodyApplicationInput;
      Params: UpdateParamsApplicationInput;
    }>,
    reply: FastifyReply,
  ) {
    const { id } = req.params;
    const { confirmPassword, password, email, name } = req.body;

    try {
      const updateApplicationUseCase = makeUpdateApplicationUseCase();

      await updateApplicationUseCase.execute({
        id,
        confirmPassword,
        password,
        email,
        name,
      });

      return reply.status(HTTP_STATUS_CODE.NoContent).send();
    } catch (error) {
      return error;
    }
  }
}
