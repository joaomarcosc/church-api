import { randomUUID } from "node:crypto";
import type {
  CreateVisitorParams,
  FindByIdParams,
  FindByNameParams,
  Visitor,
  VisitorRepository,
} from "../visitors-repository";

export class InMemoryVisitorsRepository implements VisitorRepository {
  private visitors: Visitor[] = [];

  async create(data: CreateVisitorParams): Promise<Visitor | undefined> {
    const visitor: Visitor = { ...data, id: randomUUID(), createdAt: new Date(), updatedAt: new Date() };

    this.visitors.push(visitor);

    return visitor;
  }

  async findById(data: FindByIdParams): Promise<Visitor | undefined> {
    const visitor = this.visitors.find((item) => item.id === data.id);

    return visitor;
  }

  async findByName(data: FindByNameParams): Promise<Visitor | undefined> {
    const visitor = this.visitors.find((item) => item.name === data.name);

    return visitor;
  }
}
