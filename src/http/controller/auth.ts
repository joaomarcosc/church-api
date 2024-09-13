import { loginSchema } from "@/schemas/auth";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function authController(request: FastifyRequest, reply: FastifyReply) {
  const body = loginSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute(body);
  } catch (_) {
    reply.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = await reply.jwtSign(body);

  reply.setCookie("access_token", token, {
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7, // valid 1 week,
    httpOnly: true,
    secure: true,
  });

  return reply.send({ accessToken: token });
}

export async function logoutController(_: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");

  reply.status(201).send({ message: "Logout succesfully" });
}
