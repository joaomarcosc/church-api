import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-register-user";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { GetUserProfileUseCase } from "./get-user-profile";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: await bcrypt.hash("123456", 6),
    });

    const { user } = await sut.axecute(createdUser.id);

    expect(user.name).toEqual("teste");
  });

  it("should not be able to get user profile with wrong userId", async () => {
    await inMemoryUsersRepository.create({
      name: "teste",
      email: "teste@teste.com",
      password: await bcrypt.hash("123456", 6),
    });

    expect(sut.axecute("123456")).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
