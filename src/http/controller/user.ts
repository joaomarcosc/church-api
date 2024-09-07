import type { FastifyReply, FastifyRequest } from "fastify";

import { userSchema } from "@/schemas/user";
import { createUserUseCase } from "@/use-cases/create-user";
import { listAllUsersUseCase } from "@/use-cases/list-users";

export async function createUserController(req: FastifyRequest, reply: FastifyReply) {
  const body = userSchema.parse(req.body);

  try {
    await createUserUseCase(body);
  } catch (_) {
    reply.status(409).send();
  }

  reply.status(201).send();
}

export async function listAllUsersController(_: FastifyRequest, reply: FastifyReply) {
  const users = await listAllUsersUseCase();

  reply.send({ users });
}
