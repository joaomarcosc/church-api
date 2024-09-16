import type { Church } from "@/repositories/church-repository";
import { InMemoryChurchRepository } from "@/repositories/in-memory/in-memory-church-repository";
import { InMemoryMembersRepository } from "@/repositories/in-memory/in-memory-member";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { GetMemberProfileUseCase } from "./get-member-profile";

let inMemoryMembersRepository: InMemoryMembersRepository;
let inMemoryChurchRepository: InMemoryChurchRepository;
let church: Church;
let sut: GetMemberProfileUseCase;

describe("Get member profile use case", () => {
  beforeEach(async () => {
    inMemoryMembersRepository = new InMemoryMembersRepository();
    inMemoryChurchRepository = new InMemoryChurchRepository();

    church = await inMemoryChurchRepository.create({
      email: "teste@teste.com",
      password: "teste",
      name: "joao",
      phone: "opopa",
    });

    sut = new GetMemberProfileUseCase(inMemoryMembersRepository, inMemoryChurchRepository);
  });

  it("should be able to get member profile", async () => {
    const createdMember = await inMemoryMembersRepository.create({
      name: "teste",
      address: "algum lugar",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: church.id,
    });

    const { member } = await sut.axecute({ memberId: createdMember.id, churchId: createdMember.churchId });

    expect(member.name).toEqual("teste");
  });

  it("should not be able to get member profile with wrong memberId", async () => {
    await inMemoryMembersRepository.create({
      name: "teste",
      address: "algum lugar",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: church.id,
    });

    expect(sut.axecute({ memberId: "1", churchId: church.id })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to get member profile with wrong churchId", async () => {
    const member = await inMemoryMembersRepository.create({
      name: "teste",
      address: "algum lugar",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: church.id,
    });

    expect(sut.axecute({ memberId: member.id, churchId: "2" })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
