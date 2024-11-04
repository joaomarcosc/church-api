import { KyselyApplicationsRepository } from "@/repositories/kysely/kysely-applications-repository";
import { UpdateApplicationsUseCase } from "../update-applications/update-applications";

export function makeUpdateApplicationUseCase() {
  const applicationsRepository = new KyselyApplicationsRepository();
  const updateApplicationUseCase = new UpdateApplicationsUseCase(applicationsRepository);

  return updateApplicationUseCase;
}
