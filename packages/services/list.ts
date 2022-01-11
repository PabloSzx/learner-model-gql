export const baseServicesList = {
  users: 3002,
  actions: 3003,
  content: 3004,
  domain: 3005,
  projects: 3006,
  state: 3007,
  modeler: 3008,
} as const;

export const servicesNames = Object.keys(baseServicesList) as ServiceName[];

export type ServiceName = keyof typeof baseServicesList;
