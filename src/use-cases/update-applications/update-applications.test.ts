import { InMemoryApplicationsRepository } from "@/repositories/in-memory/in-memory-application-repository";
import { compare } from "bcrypt";
import type { Selectable } from "kysely";
import type { Applications } from "kysely-codegen";
import { beforeEach, describe, expect, it } from "vitest";
import { PasswordDoNotMatchError } from "../errors/password-do-not-match";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { UpdateApplicationsUseCase } from "./update-applications";

describe("Update Application use case", () => {
  let applicationsRepository: InMemoryApplicationsRepository;
  let sut: UpdateApplicationsUseCase;
  let application: Selectable<Applications>;

  beforeEach(async () => {
    applicationsRepository = new InMemoryApplicationsRepository();
    sut = new UpdateApplicationsUseCase(applicationsRepository);

    application = await applicationsRepository.create({
      email: "teste@gmail.com",
      name: "test",
      password: "123456",
    });
  });

  it("should be can update email only", async () => {
    const { application: updatedApplication } = await sut.execute({
      id: application.id,
      email: "teste@teste.com",
    });

    expect(updatedApplication?.email).toEqual("teste@teste.com");
  });

  it("should be can update name only", async () => {
    const { application: updatedApplication } = await sut.execute({
      id: application.id,
      name: "teste123",
    });

    expect(updatedApplication?.name).toEqual("teste123");
  });

  it("should be can update password only", async () => {
    const { application: updatedApplication } = await sut.execute({
      id: application.id,
      password: "teste",
      confirmPassword: "teste",
    });

    const doesPasswordMatch = await compare("teste", updatedApplication?.password ?? "");

    expect(doesPasswordMatch).toBeTruthy();
  });

  it("should not be can update password when doesnt match with confirmPassword", async () => {
    expect(
      sut.execute({
        id: application.id,
        password: "teste",
        confirmPassword: "teste2",
      }),
    ).rejects.toBeInstanceOf(PasswordDoNotMatchError);
  });

  it("should not be can update application with incorrect id", async () => {
    expect(
      sut.execute({
        id: "incorrect-id",
        password: "teste",
        confirmPassword: "teste2",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
