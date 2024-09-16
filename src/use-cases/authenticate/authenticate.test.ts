import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-register-user";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials";
import { AuthenticateUseCase } from "./authenticate";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it("should be able authenticate", async () => {
    await inMemoryUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: await bcrypt.hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "teste@teste.com",
      password: "123456",
    });

    expect(user?.id).toEqual(expect.any(String));
  });

  it("Should not be able authenticate with wrong email", async () => {
    await inMemoryUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: await bcrypt.hash("123456", 6),
    });

    expect(
      sut.execute({
        email: "teste@testew.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able authenticate with wrong password", async () => {
    await inMemoryUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: await bcrypt.hash("123456", 6),
    });

    expect(
      sut.execute({
        email: "teste@teste.com",
        password: "123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
