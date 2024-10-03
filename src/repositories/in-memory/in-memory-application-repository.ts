import { randomUUID } from "node:crypto";
import type { CreateApplicationInput, UpdateApplicationInput } from "@/schemas/applications";
import type { Selectable } from "kysely";
import type { Applications } from "kysely-codegen";
import type { ApplicationsRepository } from "../applications-repository";

export class InMemoryApplicationsRepository implements ApplicationsRepository {
  applications: Selectable<Applications>[] = [];

  async create(data: Omit<CreateApplicationInput, "confirm_password">) {
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

  async findById(id: string) {
    const findApplication = this.applications.find((data) => data.id === id);

    return findApplication;
  }

  async update(data: UpdateApplicationInput) {
    const findApplicationIndex = this.applications.findIndex((item) => item.id === data.id);
    let updatedApplication: Selectable<Applications> | undefined;

    if (findApplicationIndex > -1) {
      const findApplication = this.applications[findApplicationIndex];

      updatedApplication = {
        ...findApplication,
        name: data.name ?? findApplication.name,
        email: data.email ?? findApplication.email,
        password: data.password ?? findApplication.password,
        updatedAt: new Date(),
      };

      this.applications.splice(findApplicationIndex, 1, updatedApplication);
    }

    return updatedApplication;
  }
}
