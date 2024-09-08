import { KyselyUsersRepository } from "@/repositories/kysely/kysely-users-repository";
import { userSchema } from "@/schemas/user";
import { listAllUsersUseCase } from "@/use-cases/list-users";
import { RegisterUserUseCase } from "@/use-cases/register-user";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function createUserController(req: FastifyRequest, reply: FastifyReply) {
  const body = userSchema.parse(req.body);

  try {
    const usersRepository = new KyselyUsersRepository();
    const registerUseCase = new RegisterUserUseCase(usersRepository);
    await registerUseCase.execute(body);
  } catch (_) {
    reply.status(409).send();
  }

  reply.status(201).send();
}

export async function listAllUsersController(_: FastifyRequest, reply: FastifyReply) {
  const users = await listAllUsersUseCase();

  reply.send({ users });
}
