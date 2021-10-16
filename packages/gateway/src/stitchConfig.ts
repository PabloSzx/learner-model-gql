import type { SubschemaConfig } from "@graphql-tools/delegate";
import type { Node } from "./ez.generated";
import type { ServiceName } from "api-base";

export const ProjectMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "projects",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const DomainMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "domains",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const TopicMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "topics",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const ContentMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "content",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const UsersMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "users",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const GroupsMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "groups",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const KCMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "kcs",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

const defaultMergeConfig = {
  Project: ProjectMerge,
  Domain: DomainMerge,
  Topic: TopicMerge,
  Content: ContentMerge,
  User: UsersMerge,
  Group: GroupsMerge,
  KC: KCMerge,
};

export const servicesSubschemaConfig: {
  [k in ServiceName]?: Partial<SubschemaConfig>;
} = {
  domain: {
    batch: true,
    merge: {
      ...defaultMergeConfig,
    },
  },
  users: {
    batch: true,
    merge: {
      ...defaultMergeConfig,
    },
  },
  projects: {
    batch: true,
    merge: {
      ...defaultMergeConfig,
    },
  },
  content: {
    batch: true,
    merge: {
      ...defaultMergeConfig,
    },
  },
  actions: {
    batch: true,
    merge: {
      ...defaultMergeConfig,
    },
  },
  state: {
    batch: true,
    merge: {
      ...defaultMergeConfig,
    },
  },
};
