import type { SubschemaConfig } from "@graphql-tools/delegate";
import type { Node } from "./ez.generated";
import type { ServiceName } from "api-base";

export const ProjectMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "projects",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  args: (originalObject: Node) => ({ id: originalObject.id }),
};

export const DomainMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "domains",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  args: (originalObject: Node) => ({ id: originalObject.id }),
};

export const TopicMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "topics",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  args: (originalObject: Node) => ({ id: originalObject.id }),
};

export const ContentMerge: NonNullable<SubschemaConfig["merge"]>[string] = {
  fieldName: "content",
  selectionSet: "{ id }",
  key: ({ id }: Node) => id,
  args: (originalObject: Node) => ({ id: originalObject.id }),
};

export const servicesSubschemaConfig: {
  [k in ServiceName]?: Partial<SubschemaConfig>;
} = {
  domain: {
    merge: {
      Project: ProjectMerge,
      Domain: DomainMerge,
      Topic: TopicMerge,
      Content: ContentMerge,
      AdminQueries: {},
    },
  },
  users: {
    merge: {
      AdminQueries: {},
    },
  },
  projects: {
    merge: {
      Project: ProjectMerge,
      Domain: DomainMerge,
      Topic: TopicMerge,
      Content: ContentMerge,
    },
  },
};
