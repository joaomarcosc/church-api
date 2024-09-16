export interface CreateMemberParams {
  name: string;
  phone: string;
  address: string;
  birthDate: Date;
  joinDate: Date;
  churchId: string;
}

export interface FindByNameParams {
  name: string;
}

export interface FindByIdParams {
  memberId: string;
}

export interface Member {
  address: string;
  birthDate: Date;
  churchId: string;
  createdAt: Date;
  id: string;
  joinDate: Date;
  name: string;
  phone: string;
  updatedAt: Date;
}

export interface SearchManyParams {
  query: string;
  page: number;
  perPage: number;
  churchId: string;
  order: "asc" | "desc";
}

export interface MembersRepository {
  create(data: CreateMemberParams): Promise<Member | undefined>;
  findByName(email: FindByNameParams): Promise<Member | undefined>;
  findById(userId: FindByIdParams): Promise<Member | undefined>;
  searchMany(data: SearchManyParams): Promise<Member[] | undefined>;
}
