import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";
import jwtPlugin from "./plugins/jwt-authenticate";

const app = fastify({
  // logger: env.NODE_ENV === "development",
});

app.register(fastifyCookie);
app.register(jwtPlugin);

app.register(appRoutes, {
  prefix: "/api/v1",
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Should log to an external tool like DataDog/Sentry/NewRelic...
  }

  return reply.status(500).send({ message: "Internal server error" });
});

export { app };
