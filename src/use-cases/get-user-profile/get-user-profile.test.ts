import { InMemoryMembersRepository } from "@/repositories/in-memory/in-memory-member";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { GetMemberProfileUseCase } from "./get-user-profile";

let inMemoryMembersRepository: InMemoryMembersRepository;
let sut: GetMemberProfileUseCase;

describe("Get member profile use case", () => {
  beforeEach(() => {
    inMemoryMembersRepository = new InMemoryMembersRepository();
    sut = new GetMemberProfileUseCase(inMemoryMembersRepository);
  });

  it("should be able to get member profile", async () => {
    const createdMember = await inMemoryMembersRepository.create({
      name: "teste",
      address: "algum lugar",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: "1",
    });

    const { member } = await sut.axecute(createdMember.id);

    expect(member.name).toEqual("teste");
  });

  it("should not be able to get member profile with wrong memberId", async () => {
    await inMemoryMembersRepository.create({
      name: "teste",
      address: "algum lugar",
      birthDate: new Date(),
      joinDate: new Date(),
      phone: "",
      churchId: "1",
    });

    expect(sut.axecute("123456")).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
