import type { Church, ChurchRepository, CreateChurchParams } from "@/repositories/church-repository";
import bcrypt from "bcrypt";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

interface RegisterChurchResponse {
  church?: Church;
}

export class RegisterChurchUseCase {
  constructor(private churchs: ChurchRepository) {}

  async execute(data: CreateChurchParams): Promise<RegisterChurchResponse> {
    const { password, ...rest } = data;

    const hashedPassword = await bcrypt.hash(password, 6);

    const hasChurch = await this.churchs.findByEmail({ email: rest.email });

    if (hasChurch) {
      throw new UserAlreadyExistsError();
    }

    const church = await this.churchs.create({ password: hashedPassword, ...rest });

    return {
      church,
    };
  }
}
