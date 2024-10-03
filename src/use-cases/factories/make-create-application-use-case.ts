import { KyselyApplicationsRepository } from "@/repositories/kysely/kysely-applications-repository";
import { CreateApplicationsUseCase } from "../create-applications/create-applications";

export function makeCreateApplicationUseCase() {
  const applicationsRepository = new KyselyApplicationsRepository();
  const createApplicationUseCase = new CreateApplicationsUseCase(applicationsRepository);

  return createApplicationUseCase;
}
