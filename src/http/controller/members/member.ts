import { createMemberSchema, getMemberProfileSchema, searchMemberSchema } from "@/schemas/member";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeGetMemberProfileUseCase } from "@/use-cases/factories/make-get-member-profile";
import { makeRegisterMemberUseCase } from "@/use-cases/factories/make-register-member-use-case";
import { makeSearchManyMembersUseCase } from "@/use-cases/factories/make-search-many-members";
import type { FastifyReply, FastifyRequest } from "fastify";

export class MemberController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const body = createMemberSchema.parse(req.body);
    const churchId = req.user.sub;

    try {
      const registerUseCase = makeRegisterMemberUseCase();

      await registerUseCase.execute({ ...body, churchId });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message });
      }

      throw error;
    }

    reply.status(201).send({ message: "Member created" });
  }

  async searchManyMembers(req: FastifyRequest, reply: FastifyReply) {
    const query = searchMemberSchema.parse(req.query);
    const churchId = req.user.sub;

    const members = await makeSearchManyMembersUseCase().execute({
      ...query,
      churchId,
    });

    reply.send(members);
  }

  async getMemberProfile(req: FastifyRequest, reply: FastifyReply) {
    const { memberId } = getMemberProfileSchema.parse(req.params);
    const churchId = req.user.sub;

    const { member } = await makeGetMemberProfileUseCase().execute({
      memberId,
      churchId,
    });

    return reply.send(member);
  }
}
