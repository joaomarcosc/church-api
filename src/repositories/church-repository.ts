export interface CreateChurchParams {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Church {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindByEmailParams {
  email: string;
}

export interface FindByIdParams {
  id: string;
}

export interface ChurchRepository {
  create(data: CreateChurchParams): Promise<Church | undefined>;
  findByEmail(data: FindByEmailParams): Promise<Church | undefined>;
  findById(data: FindByIdParams): Promise<Church | undefined>;
}
