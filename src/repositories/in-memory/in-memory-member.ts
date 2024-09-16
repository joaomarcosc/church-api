import { randomUUID } from "node:crypto";
import type {
  CreateMemberParams,
  FindByIdParams,
  FindByNameParams,
  Member,
  MembersRepository,
  SearchManyParams,
} from "../member-repository";

export class InMemoryMembersRepository implements MembersRepository {
  private members: Member[] = [];

  async create(data: CreateMemberParams) {
    const member = { ...data, id: randomUUID(), createdAt: new Date(), updatedAt: new Date() };

    this.members.push(member);

    return member;
  }

  async findByName(data: FindByNameParams) {
    const member = this.members.find((item) => item.name === data.name);

    return member;
  }

  async findById(data: FindByIdParams) {
    const member = this.members.find((item) => item.id === data.memberId);

    return member;
  }

  async searchMany(data: SearchManyParams) {
    const members = this.members
      .filter((item) => item.churchId === data.churchId && item.name.toLowerCase().includes(data.query.toLowerCase()))
      .slice((data.page - 1) * data.perPage, data.page * data.perPage);

    return members;
  }
}
