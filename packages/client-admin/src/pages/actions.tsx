import { VStack } from "@chakra-ui/react";
import type { ActionsInfoFragment } from "graph";
import { gql } from "graph";
import { useGQLQuery } from "rq-gql";
import { withAdminAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { contentOptionLabel } from "../hooks/content";
import { kcOptionLabel } from "../hooks/kcs";
import { useCursorPagination } from "../hooks/pagination";
import { topicOptionLabel } from "../hooks/topics";

gql(/* GraphQL */ `
  fragment ActionsInfo on Action {
    id
    verb {
      name
    }
    timestamp
    result
    user {
      id
      name
      email
    }
    content {
      id
      code
      label
      tags
    }
    topic {
      id
      code
      label
    }
    kcs {
      id
      code
      label
    }
    stepID
    hintID
    amount
    detail
    extra

    createdAt
  }
`);

export default withAdminAuth(function ActionsPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination({
    amount: 50,
  });

  const { data } = useGQLQuery(
    gql(/* GraphQL */ `
      query AllActions(
        $pagination: CursorConnectionArgs!
        $filters: AdminActionsFilter
      ) {
        adminActions {
          allActions(pagination: $pagination, filters: $filters) {
            nodes {
              ...ActionsInfo
            }
            ...Pagination
          }
        }
      }
    `),
    {
      pagination,
    }
  );
  pageInfo.current = data?.adminActions.allActions.pageInfo;

  return (
    <VStack>
      <DataTable<ActionsInfoFragment>
        data={data?.adminActions.allActions.nodes || []}
        prevPage={prevPage}
        nextPage={nextPage}
        minH="80vh"
        columns={[
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Verb",
            accessor: (v) => v.verb.name,
          },
          {
            id: "result",
            Header: "Result",
            accessor: (v) => v.result ?? "-",
          },
          {
            id: "user",
            Header: "User",
            accessor: (v) => {
              const userLabel = v.user?.name ?? v.user?.email;

              if (v.user && userLabel) {
                return `[${v.user.id}] ${userLabel}`;
              }

              return "-";
            },
          },
          {
            id: "content",
            Header: "Content",
            accessor: (v) => (v.content ? contentOptionLabel(v.content) : "-"),
          },
          {
            id: "topic",
            Header: "Topic",
            accessor: (v) => (v.topic ? topicOptionLabel(v.topic) : "-"),
          },
          {
            id: "kcs",
            Header: "KCs",
            accessor: (v) =>
              v.kcs.length ? v.kcs.map(kcOptionLabel).join() : "-",
          },
          {
            id: "step",
            Header: "Step ID",
            accessor: (v) => v.stepID ?? "-",
          },
          {
            id: "hint",
            Header: "Hint ID",
            accessor: (v) => v.hintID ?? "-",
          },
          {
            id: "amount",
            Header: "Amount",
            accessor: (v) => v.amount ?? "-",
          },
          {
            id: "detail",
            Header: "Detail",
            accessor: (v) => v.detail ?? "-",
          },
          {
            id: "extra",
            Header: "Extra",
            accessor: (v) => (v.extra ? JSON.stringify(v.extra, null, 2) : "-"),
          },
          getDateRow({
            id: "timestamp",
            label: "Timestamp",
          }),
          getDateRow({
            id: "createdAt",
            label: "Created At",
          }),
        ]}
      />
    </VStack>
  );
});
