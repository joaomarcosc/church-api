import { churchSchema } from "@/schemas/church";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterChurchUseCase } from "@/use-cases/factories/make-register-church-use-case";
import type { FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request";

export class ChurchController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const body = churchSchema.parse(req.body);

    try {
      const registerChurchUseCase = makeRegisterChurchUseCase();

      await registerChurchUseCase.execute(body);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return rep.status(409).send({ message: error.message });
      }

      throw error; // TODO: apply error to this case
    }

    rep.status(201).send({ message: "Church created with success" });
  }
}
