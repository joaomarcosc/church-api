export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface FindByEmailParams {
  email: string;
}

export interface FindByIdParams {
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersRepository {
  create(data: CreateUserParams): Promise<User | undefined>;
  findByEmail(email: FindByEmailParams): Promise<User | undefined>;
  findById(userId: FindByIdParams): Promise<User | undefined>;
}
