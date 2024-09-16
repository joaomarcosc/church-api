import type { Church } from "@/repositories/church-repository";
import { InMemoryChurchRepository } from "@/repositories/in-memory/in-memory-church-repository";
import { InMemoryMembersRepository } from "@/repositories/in-memory/in-memory-member";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchManyMembersUseCase } from "./search-many-members";

let inMemoryMembersRepository: InMemoryMembersRepository;
let inMemoryChurchRepository: InMemoryChurchRepository;
let sut: SearchManyMembersUseCase;
let church: Church;

describe("List members use case", () => {
  beforeEach(async () => {
    inMemoryMembersRepository = new InMemoryMembersRepository();
    inMemoryChurchRepository = new InMemoryChurchRepository();

    church = await inMemoryChurchRepository.create({
      email: "teste@teste.com",
      password: "teste",
      name: "joao",
      phone: "opopa",
    });

    sut = new SearchManyMembersUseCase(inMemoryMembersRepository, inMemoryChurchRepository);
  });

  it("Should be to list members when filter by name", async () => {
    await inMemoryMembersRepository.create({
      name: "Joao 1",
      address: "Joao address",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: church.id,
    });

    await inMemoryMembersRepository.create({
      name: "Joao 2",
      address: "Joao address",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: church.id,
    });

    const { members } = await sut.execute({
      query: "Joao",
      churchId: church.id,
      order: "asc",
      page: 2,
      perPage: 1,
    });

    expect(members).toEqual([expect.objectContaining({ name: "Joao 2" })]);
  });
});
