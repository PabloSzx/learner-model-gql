import type {
  MergedTypeConfig,
  SubschemaConfig,
} from "@graphql-tools/delegate";
import { ServiceName, servicesNames } from "api-base";
import type { Node } from "./ez.generated";

export type MergeConfig = MergedTypeConfig<any, any, Record<string, any>>;

export const ProjectMerge: MergeConfig = {
  fieldName: "projects",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const DomainMerge: MergeConfig = {
  fieldName: "domains",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const TopicMerge: MergeConfig = {
  fieldName: "topics",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const ContentMerge: MergeConfig = {
  fieldName: "content",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const UsersMerge: MergeConfig = {
  fieldName: "users",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const GroupsMerge: MergeConfig = {
  fieldName: "groups",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  argsFromKeys: (ids) => ({ ids }),
};

export const KCMerge: MergeConfig = {
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

export const servicesSubschemaConfig = servicesNames.reduce(
  (acum, serviceName) => {
    acum[serviceName] = {
      batch: true,
      merge: {
        ...defaultMergeConfig,
      },
    };
    return acum;
  },
  {} as {
    [k in ServiceName]: Omit<SubschemaConfig, "schema">;
  }
);
