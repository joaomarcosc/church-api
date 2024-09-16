import type { Church, ChurchRepository } from "@/repositories/church-repository";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../errors/invalid-credentials";

interface AuthenticateChurchUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateChurchUseCaseResposne {
  church: Church;
}

export class AuthenticateChurchUseCase {
  constructor(private churchRepository: ChurchRepository) {}

  async execute(data: AuthenticateChurchUseCaseRequest): Promise<AuthenticateChurchUseCaseResposne> {
    const church = await this.churchRepository.findByEmail({ email: data.email });

    if (!church) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await bcrypt.compare(data.password, church.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      church,
    };
  }
}
