import type { ApplicationsRepository } from "@/repositories/applications-repository";
import { InMemoryApplicationsRepository } from "@/repositories/in-memory/in-memory-application-repository";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceAlreadyExists } from "../errors/resource-already-exists";
import { CreateApplicationsUseCase } from "./create-applications";

describe("Create Application Use Case", () => {
  let applicationsRepository: ApplicationsRepository;
  let sut: CreateApplicationsUseCase;

  beforeEach(() => {
    applicationsRepository = new InMemoryApplicationsRepository();
    sut = new CreateApplicationsUseCase(applicationsRepository);
  });

  it("Should be able to create an application with correct data", async () => {
    const { application } = await sut.execute({
      name: "teste",
      email: "test@teste.com",
      password: "teste12345",
      confirm_password: "teste12345",
    });

    expect(application?.id).toEqual(expect.any(String));
  });

  it("Should be able to hash password when create account", async () => {
    const { application } = await sut.execute({
      name: "teste",
      email: "test@teste.com",
      password: "teste12345",
      confirm_password: "teste12345",
    });

    const doesPasswordHashed = await compare("teste12345", application?.password ?? "");

    expect(doesPasswordHashed).toBeTruthy();
  });

  it("Should not be able to create an application with same email address", async () => {
    await sut.execute({
      name: "teste",
      email: "test@teste.com",
      password: "teste12345",
      confirm_password: "teste12345",
    });

    expect(
      sut.execute({
        name: "teste",
        email: "test@teste.com",
        password: "teste12345",
        confirm_password: "teste12345",
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExists);
  });
});
