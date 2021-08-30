import assert from "assert";
import { gql } from "graphql-ez/utils";

import { toNonNegativeInteger } from "./casters";

export const ConnectionTypes = gql`
  type PageInfo {
    startCursor: String
    endCursor: String

    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  interface Node {
    id: IntID!
  }

  interface Connection {
    pageInfo: PageInfo
  }

  input CursorConnectionArgs {
    first: NonNegativeInt
    after: IntID

    last: NonNegativeInt
    before: IntID
  }
`;

export type CursorConnectionArgs = {
  first?: number | null;
  after?: number | null;

  last?: number | null;
  before?: number | null;
};

export type PageInfo = {
  startCursor?: string | null;
  endCursor?: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function ResolveCursorConnection<T extends { id: number | string }>(
  input: {
    first?: number | null;
    after?: number | null;

    last?: number | null;
    before?: number | null;
  },
  cb: (connectionArgs: {
    take: number;
    skip: number | undefined;
    cursor:
      | {
          id: number;
        }
      | undefined;
  }) => Promise<T[]>
) {
  const {
    after,
    first,

    before,
    last,
  } = input;

  if (first == null && last == null) {
    throw Error("You have to specify either 'last' or 'first'");
  } else if (before && last == null) {
    throw Error("If you use 'before', you have to specify 'last'");
  } else if (after && first == null) {
    throw Error("If you use 'after', you have to specify 'first'");
  }

  let forwardPagination: boolean;

  let take: number;

  if (before) {
    forwardPagination = false;
    take = last!;
  } else if (after) {
    forwardPagination = true;
    take = first!;
  } else if (first != null) {
    forwardPagination = true;
    take = first;
  } else {
    forwardPagination = false;
    take = last!;
  }

  const originalLength = take++;

  assert(originalLength <= 50, "You can only take up to 50 nodes");

  let hasExtraNode = false;

  let nodes: T[];

  if (forwardPagination) {
    nodes = await cb({
      take,
      skip: after ? 1 : undefined,
      cursor: after
        ? {
            id: toNonNegativeInteger(after),
          }
        : undefined,
    });
  } else {
    nodes = await cb({
      take: -take,
      skip: before ? 1 : undefined,
      cursor: before
        ? {
            id: toNonNegativeInteger(before),
          }
        : undefined,
    });
  }

  // This is in case the callback returns an unexpected null instead of an array
  nodes ||= [];

  if (nodes.length > originalLength) {
    hasExtraNode = forwardPagination ? !!nodes.pop() : !!nodes.shift();
  }

  const hasNextPage = forwardPagination ? hasExtraNode : !!before;
  const hasPreviousPage = forwardPagination ? !!after : hasExtraNode;

  const pageInfo: PageInfo = {
    startCursor: nodes[0]?.id.toString(),
    endCursor: nodes[nodes.length - 1]?.id.toString(),
    hasNextPage,
    hasPreviousPage,
  };

  return {
    nodes,
    pageInfo,
  };
}
