import { loginSchema } from "@/schemas/auth";
import { loginUserUseCase } from "@/use-cases/login-user";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  const { password, email } = loginSchema.parse(request.body);

  try {
    await loginUserUseCase({
      email,
      password,
    });
  } catch (_) {
    reply.status(401).send({
      message: "Unauthorized",
    });
  }

  const token = await reply.jwtSign({ password, email });

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
