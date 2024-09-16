import type { Church } from "@/repositories/church-repository";
import { InMemoryChurchRepository } from "@/repositories/in-memory/in-memory-church-repository";
import { InMemoryVisitorsRepository } from "@/repositories/in-memory/in-memory-visitors-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { RegisterVisitorsUseCase } from "./register-visitor";

let inMemoryVisitorsRepository: InMemoryVisitorsRepository;
let inMemoryChurchRepository: InMemoryChurchRepository;
let church: Church;
let sut: RegisterVisitorsUseCase;

describe("Register visitor use case", () => {
  beforeEach(async () => {
    inMemoryVisitorsRepository = new InMemoryVisitorsRepository();
    inMemoryChurchRepository = new InMemoryChurchRepository();

    church = await inMemoryChurchRepository.create({
      email: "teste@teste.com",
      password: "teste",
      name: "joao",
      phone: "opopa",
    });

    sut = new RegisterVisitorsUseCase(inMemoryVisitorsRepository, inMemoryChurchRepository);
  });

  it("should not be able to register with same name", async () => {
    await sut.execute({
      name: "teste",
      visitDates: [new Date()],
      phone: "",
      churchId: church.id,
    });

    expect(
      sut.execute({
        name: "teste",
        visitDates: [new Date()],
        phone: "",
        churchId: church.id,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { visitor } = await sut.execute({
      name: "teste",
      visitDates: [new Date()],
      phone: "",
      churchId: church.id,
    });

    expect(visitor?.id).toEqual(expect.any(String));
  });
});
