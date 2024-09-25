import { createVisitorSchema } from "@/schemas/visitors";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterVisitorUseCase } from "@/use-cases/factories/make-register-visitor-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export class VisitorsController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const body = createVisitorSchema.parse(req.body);
    const churchId = req.user.sub;

    try {
      const registerVisitorUseCase = makeRegisterVisitorUseCase();

      await registerVisitorUseCase.execute({
        ...body,
        churchId,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message });
      }

      throw error;
    }

    return reply.status(201).send({ message: "Visitor created" });
  }
}
