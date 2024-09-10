import type { UsersRepository } from "@/repositories/users-repository";
import bcrypt from "bcrypt";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new Error("E-mail already exists");
    }

    await this.usersRepository.create({ name, email, password: hashedPassword });
  }
}
