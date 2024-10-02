export const ALL_PERMISSIONS = [
  // members
  "members:roles:write",
  "members:roles:delete",
  "members:roles:update",
  "members:roles:read",

  // visitors
  "visitors:roles:write",
  "visitors:roles:delete",
  "visitors:roles:update",
  "visitors:roles:read",

  //roles
  "role:write",
];

export const PERMISSIONS = ALL_PERMISSIONS.reduce(
  (acc, current) => {
    acc[current] = current;
    return acc;
  },
  {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>,
);

export const USER_ROLE_PERMISSION = [PERMISSIONS["members:read"], PERMISSIONS["visitors:read"]];

export const SYSTEM_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  APPLICATION_USER: "APPLICATION_USER",
};
