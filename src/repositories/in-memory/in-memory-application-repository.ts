import { randomUUID } from "node:crypto";
import type { CreateApplicationInput } from "@/schemas/applications";
import type { Selectable } from "kysely";
import type { Applications } from "kysely-codegen";
import type { ApplicationsRepository } from "../applications-repository";

export class InMemoryApplicationsRepository implements ApplicationsRepository {
  applications: Selectable<Applications>[] = [];

  async create(data: CreateApplicationInput) {
    const application: Selectable<Applications> = {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
      ...data,
    };

    this.applications.push(application);

    return application;
  }

  async findByEmail(email: string) {
    const findApplication = this.applications.find((data) => data.email === email);

    return findApplication;
  }
}
