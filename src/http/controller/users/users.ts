import type { CreateUserInput } from "@/schemas/users";
import { ResourceAlreadyExists } from "@/use-cases/errors/resource-already-exists";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case";
import { HTTP_STATUS_CODE } from "@/utils/status-codes";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UsersController {
  async create(
    req: FastifyRequest<{
      Body: CreateUserInput;
    }>,
    reply: FastifyReply,
  ) {
    const body = req.body;

    try {
      const createUserUseCase = makeCreateUserUseCase();

      await createUserUseCase.execute(body);

      return reply.status(HTTP_STATUS_CODE.Created).send({
        message: "User created with success",
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
