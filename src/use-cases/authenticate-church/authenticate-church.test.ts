import { InMemoryChurchRepository } from "@/repositories/in-memory/in-memory-church-repository";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials";
import { AuthenticateChurchUseCase } from "./authenticate-church";

let inMemoryChurchRepository: InMemoryChurchRepository;
let sut: AuthenticateChurchUseCase;

describe("Authenticate church use case", () => {
  beforeEach(async () => {
    inMemoryChurchRepository = new InMemoryChurchRepository();

    await inMemoryChurchRepository.create({
      email: "teste@teste.com",
      password: await bcrypt.hash("teste", 6),
      name: "joao",
      phone: "opopa",
    });

    sut = new AuthenticateChurchUseCase(inMemoryChurchRepository);
  });

  it("should be can authenticate with correct data", async () => {
    const { church } = await sut.execute({
      email: "teste@teste.com",
      password: "teste",
    });

    expect(church.id).toEqual(expect.any(String));
  });

  it("should not be can authenticate with wrong password", async () => {
    expect(
      sut.execute({
        email: "teste@teste.com",
        password: "teste2",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be can authenticate with wrong email", async () => {
    expect(
      sut.execute({
        email: "teste2@teste.com",
        password: "teste",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
