import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";
import jwtPlugin from "./plugins/jwt-authenticate";

const app = fastify({
  logger: env.NODE_ENV === "development",
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

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
