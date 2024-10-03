import fastifyCookie from "@fastify/cookie";
import fastifyFormbody from "@fastify/formbody";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { env } from "./env";
import { appRoutes } from "./http/routes";
import jwtPlugin from "./plugins/jwt-authenticate";

const app = fastify({
  logger: env.NODE_ENV === "development",
});

app.register(fastifyFormbody);
app.register(fastifyMultipart);
app.register(fastifyCookie);
app.register(jwtPlugin);

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Church API",
      description: "Documentation to use Church api in your project.",
      version: "0.1.0",
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Enter your bearer token in the format **Bearer &lt;token&gt;**",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "refreshToken",
        description: "Enter your refreshToken cookie.",
      },
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

app.register(appRoutes, {
  prefix: "/api/v1",
});

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== "production") {
    console.error(error.stack);
  } else {
    // TODO: Should log to an external tool like DataDog/Sentry/NewRelic...
  }

  return reply.status(error.statusCode ?? 500).send({ message: error.message });
});

export { app };
