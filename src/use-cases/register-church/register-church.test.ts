import type { ChurchRepository } from "@/repositories/church-repository";
import { InMemoryChurchRepository } from "@/repositories/in-memory/in-memory-church-repository";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { RegisterChurchUseCase } from "./register-church";

let churchRepository: ChurchRepository;
let sut: RegisterChurchUseCase;

describe("Register church use case", () => {
  beforeEach(() => {
    churchRepository = new InMemoryChurchRepository();
    sut = new RegisterChurchUseCase(churchRepository);
  });

  it("should be hash a password when create church", async () => {
    const { church } = await sut.execute({
      email: "church@church.com",
      name: "church",
      phone: "123456",
      password: "church_password",
    });

    const hasHashedPassword = await bcrypt.compare("church_password", church?.password ?? "");

    expect(hasHashedPassword).toBe(true);
  });

  it("should be able to register church", async () => {
    const { church } = await sut.execute({
      email: "church@church.com",
      name: "church",
      phone: "123456",
      password: "church_password",
    });

    expect(church?.id).toEqual(expect.any(String));
  });

  it("should not be able to register church with same email", async () => {
    await sut.execute({
      email: "church@church.com",
      name: "church",
      phone: "123456",
      password: "church_password",
    });

    expect(
      sut.execute({
        email: "church@church.com",
        name: "church",
        phone: "123456",
        password: "church_password",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
