export const baseServicesList = {
  users: 3002,
  actions: 3003,
  content: 3004,
  domain: 3005,
  projects: 3006,
  state: 3007,
} as const;

export type ServiceName = keyof typeof baseServicesList;
