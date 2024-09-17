import { authenticateChurchSchema, churchSchema } from "@/schemas/church";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeAuthenticateChurchUseCase } from "@/use-cases/factories/make-authenticate-church";
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

  async authenticate(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateChurchSchema.parse(req.body);

    try {
      const { church } = await makeAuthenticateChurchUseCase().execute({ email, password });

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: church.id,
          },
        },
      );

      return reply.status(200).send({
        token,
      });
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message });
      }

      throw err;
    }
  }
}
