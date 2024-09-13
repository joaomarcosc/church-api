import { userSchema } from "@/schemas/user";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { listAllUsersUseCase } from "@/use-cases/list-users";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function createUserController(req: FastifyRequest, reply: FastifyReply) {
  const body = userSchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute(body);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error; // TODO: apply error to this case
  }

  reply.status(201).send();
}

export async function listAllUsersController(_: FastifyRequest, reply: FastifyReply) {
  const users = await listAllUsersUseCase();

  reply.send({ users });
}
