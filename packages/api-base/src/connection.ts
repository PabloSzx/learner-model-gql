import assert from "assert";
import { gql } from "graphql-ez/utils";

import { toNonNegativeInteger } from "./casters";

export const ConnectionTypes = gql`
  "Paginated related information"
  type PageInfo {
    "Cursor parameter normally used for backward pagination"
    startCursor: String

    "Cursor parameter normally used for forward pagination"
    endCursor: String

    """
    Utility field that returns "true" if a next page can be fetched
    """
    hasNextPage: Boolean!

    """
    Utility field that returns "true" if a previous page can be fetched
    """
    hasPreviousPage: Boolean!
  }

  "Minimum Entity Information"
  interface Node {
    "Unique numeric identifier"
    id: IntID!
  }

  "Pagination Interface"
  interface Connection {
    "Pagination information"
    pageInfo: PageInfo!
  }

  """
  Pagination parameters

  Forward pagination parameters can't be mixed with Backward pagination parameters simultaneously

  first & after => Forward Pagination

  last & before => Backward Pagination
  """
  input CursorConnectionArgs {
    """
    Set the limit of nodes to be fetched

    It can't be more than 50
    """
    first: NonNegativeInt
    """
    Set the minimum boundary

    Use the "endCursor" field of "pageInfo"
    """
    after: IntID

    """
    Set the limit of nodes to be fetched

    It can't be more than 50
    """
    last: NonNegativeInt
    """
    Set the maximum boundary

    Use the "startCursor" field of "pageInfo"
    """
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

export async function ResolveCursorConnection<
  T extends { id: number | string }
>(
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
  }) => Promise<T[] | null>
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
    nodes =
      (await cb({
        take,
        skip: after ? 1 : undefined,
        cursor: after
          ? {
              id: toNonNegativeInteger(after),
            }
          : undefined,
      })) || [];
  } else {
    nodes =
      (await cb({
        take: -take,
        skip: before ? 1 : undefined,
        cursor: before
          ? {
              id: toNonNegativeInteger(before),
            }
          : undefined,
      })) || [];
  }

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
