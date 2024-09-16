import type { User, UsersRepository } from "@/repositories/users-repository";
import bcrypt from "bcrypt";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserUseCaseResponse {
  user?: User;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ name, email, password }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const hasUser = Boolean(await this.usersRepository.findByEmail({ email }));

    if (hasUser) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({ name, email, password: hashedPassword });

    return { user };
  }
}
