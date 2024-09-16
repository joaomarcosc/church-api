import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-register-user";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { RegisterUserUseCase } from "./register-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUserUseCase;

describe("Register User use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserUseCase(inMemoryUsersRepository);
  });

  it("should be hash a password when create account", async () => {
    const { user } = await sut.execute({
      email: "teste@teste.com",
      name: "teste",
      password: "teste123",
    });

    const hasHashedPassword = await bcrypt.compare("teste123", user?.password ?? "");

    expect(hasHashedPassword).toBe(true);
  });

  it("should not be able to register with same email", async () => {
    const email = "teste@teste.com";

    await sut.execute({
      email,
      name: "teste",
      password: "teste123",
    });

    expect(
      sut.execute({
        email,
        name: "teste",
        password: "teste123",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      email: "teste@teste.com",
      name: "teste",
      password: "teste123",
    });

    expect(user?.id).toEqual(expect.any(String));
  });
});
