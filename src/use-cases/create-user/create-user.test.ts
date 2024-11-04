import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import type { CreateUserInput } from "@/schemas/users";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceAlreadyExists } from "../errors/resource-already-exists";
import { CreateUserUseCase } from "./create-user";

describe("Create User Use Case", () => {
  let usersRepository: UsersRepository;
  let sut: CreateUserUseCase;

  const mockedUser: CreateUserInput = {
    name: "teste",
    email: "test@teste.com",
    password: "teste12345",
    confirmPassword: "teste12345",
    address: "",
    birthDate: new Date(),
    joinDate: new Date(),
    phone: "",
    role: "ADMIN",
    applicationId: "",
  };

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to create an user with correct data", async () => {
    const { user } = await sut.execute(mockedUser);

    expect(user?.id).toEqual(expect.any(String));
  });

  it("Should be able to hash password when create account", async () => {
    const { user } = await sut.execute(mockedUser);

    const doesPasswordHashed = await compare("teste12345", user?.password ?? "");

    expect(doesPasswordHashed).toBeTruthy();
  });

  it("Should not be able to create an user with same email address", async () => {
    await sut.execute(mockedUser);

    expect(sut.execute(mockedUser)).rejects.toBeInstanceOf(ResourceAlreadyExists);
  });
});
