import { memberSchema } from "@/schemas/member";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterMemberUseCase } from "@/use-cases/factories/make-register-member-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export class MemberController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const body = memberSchema.parse(req.body);

    try {
      const registerUseCase = makeRegisterMemberUseCase();

      await registerUseCase.execute(body);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message });
      }

      throw error; // TODO: apply error to this case
    }

    reply.status(201).send();
  }

  // TODO: Criar caso de uso para listar todos os membros
  // async list(_: FastifyRequest, reply: FastifyReply) {
  //   const users = await listAllUsersUseCase();

  //   reply.send({ users });
  // }
}
