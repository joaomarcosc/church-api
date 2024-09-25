import type { ChurchRepository } from "@/repositories/church-repository";
import type {} from "@/repositories/member-repository";
import type { CreateVisitorParams, Visitor, VisitorRepository } from "@/repositories/visitors-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface RegisterVisitorUseCaseRequest extends CreateVisitorParams {}

interface RegistervisitorsUseCaseResponse {
  visitor?: Visitor;
}

export class RegisterVisitorsUseCase {
  constructor(
    private visitorsRepository: VisitorRepository,
    private churchRepository: ChurchRepository,
  ) {}
  async execute(data: RegisterVisitorUseCaseRequest): Promise<RegistervisitorsUseCaseResponse> {
    const churchById = await this.churchRepository.findById({ id: data.churchId });

    if (!churchById) {
      throw new ResourceNotFoundError();
    }

    const visitor = await this.visitorsRepository.create(data);

    return { visitor };
  }
}
