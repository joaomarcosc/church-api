import { AbilityBuilder, type AbilityClass, type ExtractSubjectType, PureAbility, type Subject } from "@casl/ability";
import type { Users } from "kysely-codegen";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

// TODO: create custom objects based on models
// export type Subjects = InferSubjects<keyof User> | "all";
export type AppAbility = PureAbility<[Action, Subject]>;

const Ability = PureAbility as AbilityClass<AppAbility>;

export const defineAbility = (user: Users) => {
  const { can, build } = new AbilityBuilder(Ability);

  if (user.role === "ADMIN") {
    can(Action.Manage, "all");
  }

  if (user.role === "COMMON_USER") {
    can(Action.Read, "all");
  }

  return build({
    detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subject>,
  });
};
