import type { User, UsersRepository } from "@/repositories/users-repository";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../errors/invalid-credentials";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user?: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail({ email });

    const doesPasswordMatch = await bcrypt.compare(password, user?.password ?? "");

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
