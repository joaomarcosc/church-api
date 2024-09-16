export interface CreateVisitorParams {
  name: string;
  phone: string;
  visitDates: Date[];
  churchId: string;
}

export interface FindByNameParams {
  name: string;
}

export interface FindByIdParams {
  id: string;
}

export interface Visitor {
  churchId: string;
  createdAt: Date;
  id: string;
  name: string;
  phone: string;
  updatedAt: Date;
  visitDates: Date[];
}

export interface VisitorRepository {
  create(data: CreateVisitorParams): Promise<Visitor | undefined>;
  findByName(data: FindByNameParams): Promise<Visitor | undefined>;
  findById(data: FindByIdParams): Promise<Visitor | undefined>;
}
