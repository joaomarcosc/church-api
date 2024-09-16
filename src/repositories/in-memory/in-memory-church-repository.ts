import { randomUUID } from "node:crypto";
import type {
  Church,
  ChurchRepository,
  CreateChurchParams,
  FindByEmailParams,
  FindByIdParams,
} from "../church-repository";

export class InMemoryChurchRepository implements ChurchRepository {
  private churchs: Church[] = [];

  async create(data: CreateChurchParams) {
    const church = { id: randomUUID(), ...data, createdAt: new Date(), updatedAt: new Date() };

    this.churchs.push(church);

    return church;
  }

  async findByEmail(data: FindByEmailParams) {
    const church = this.churchs.find((item) => item.email === data.email);

    return church;
  }

  async findById(data: FindByIdParams): Promise<Church | undefined> {
    const church = this.churchs.find((item) => item.id === data.id);

    return church;
  }
}
