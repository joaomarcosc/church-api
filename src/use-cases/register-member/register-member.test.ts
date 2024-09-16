import type { Church } from "@/repositories/church-repository";
import { InMemoryChurchRepository } from "@/repositories/in-memory/in-memory-church-repository";
import { InMemoryMembersRepository } from "@/repositories/in-memory/in-memory-member";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { RegisterMemberUseCase } from "./register-member";

let inMemoryMembersRepository: InMemoryMembersRepository;
let inMemoryChurchRepository: InMemoryChurchRepository;
let church: Church;
let sut: RegisterMemberUseCase;

describe("Register member use case", () => {
  beforeEach(async () => {
    inMemoryMembersRepository = new InMemoryMembersRepository();
    inMemoryChurchRepository = new InMemoryChurchRepository();

    church = await inMemoryChurchRepository.create({
      email: "teste@teste.com",
      password: "teste",
      name: "joao",
      phone: "opopa",
    });

    sut = new RegisterMemberUseCase(inMemoryMembersRepository, inMemoryChurchRepository);
  });

  it("should not be able to register with same name", async () => {
    await sut.execute({
      name: "teste",
      address: "algum lugar",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: church.id,
    });

    expect(
      sut.execute({
        name: "teste",
        address: "algum lugar",
        birthDate: new Date(),
        joinDate: new Date(),
        phone: "",
        churchId: church.id,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { member } = await sut.execute({
      name: "teste",
      address: "algum lugar",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: church.id,
    });

    expect(member?.id).toEqual(expect.any(String));
  });
});
