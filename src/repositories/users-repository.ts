export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface UserReturn {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersRepository {
  create(data: CreateUserParams): Promise<UserReturn | undefined>;
  findByEmail(email: string): Promise<UserReturn | undefined>;
}
