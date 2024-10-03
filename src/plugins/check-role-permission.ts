// import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
// import fastifyPlugin from "fastify-plugin";

// const permissionsPlugin: FastifyPluginCallback = (app, _, done) => {
//   app.decorate("checkPermissions", (requiredPermissions: string[]) => {
//     return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
//       if (!request.user) {
//         return reply.code(401).send({ error: "Unauthorized" });
//       }

//       const userPermissions = request.user.roles.flatMap((role) => roles[role]?.permissions || []);
//       const hasPermission = requiredPermissions.every((permission) => userPermissions.includes(permission));

//   if (!hasPermission) {
//         return reply.code(403).send({ error: "Forbidden" });
//       }
//     };
//   });

//   done();
// };

// export default fastifyPlugin(permissionsPlugin);
