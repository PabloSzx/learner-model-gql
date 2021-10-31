import { VStack, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import type { ActionsInfoFragment, AdminActionsFilter } from "graph";
import { gql, useGQLQuery } from "graph";
import { useMemo } from "react";
import { withAdminAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { useSelectMultiVerbs } from "../hooks/actions";
import { contentOptionLabel, useSelectMultiContent } from "../hooks/content";
import { kcOptionLabel, useSelectMultiKCs } from "../hooks/kcs";
import { useCursorPagination } from "../hooks/pagination";
import { useSelectMultiProjects } from "../hooks/projects";
import { topicOptionLabel, useSelectMultiTopics } from "../hooks/topics";
import { useSelectMultiUsers } from "../hooks/users";

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

  const { selectMultiContentComponent, selectedContent } =
    useSelectMultiContent();
  const { selectMultiKCComponent, selectedKCs } = useSelectMultiKCs();
  const { selectMultiProjectComponent, selectedProjects } =
    useSelectMultiProjects();
  const { selectMultiTopicComponent, selectedTopics } = useSelectMultiTopics();

  const { selectMultiVerbComponent, selectedVerbs } = useSelectMultiVerbs();

  const { selectMultiUsersComponent, selectedUsers } = useSelectMultiUsers();

  const filters: AdminActionsFilter = useMemo(() => {
    return {
      content: selectedContent.length
        ? selectedContent.map((v) => v.value)
        : null,
      kcs: selectedKCs.length ? selectedKCs.map((v) => v.value) : null,
      projects: selectedProjects.length
        ? selectedProjects.map((v) => v.value)
        : null,
      topics: selectedTopics.length ? selectedTopics.map((v) => v.value) : null,
      verbNames: selectedVerbs.length
        ? selectedVerbs.map((v) => v.label)
        : null,
      users: selectedUsers.length ? selectedUsers.map((v) => v.value) : null,
    };
  }, [
    selectedContent,
    selectedKCs,
    selectedProjects,
    selectedTopics,
    selectedVerbs,
    selectedUsers,
  ]);

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
      filters,
    }
  );
  pageInfo.current = data?.adminActions.allActions.pageInfo;

  return (
    <VStack>
      <HStack wrap="wrap" align="center" justify="space-around" zIndex={1000}>
        <FormControl maxW="500px">
          <FormLabel>Content</FormLabel>
          {selectMultiContentComponent}
        </FormControl>
        <FormControl maxW="500px">
          <FormLabel>KCs</FormLabel>
          {selectMultiKCComponent}
        </FormControl>
        <FormControl maxW="500px">
          <FormLabel>Projects</FormLabel>
          {selectMultiProjectComponent}
        </FormControl>
        <FormControl maxW="500px">
          <FormLabel>Topics</FormLabel>
          {selectMultiTopicComponent}
        </FormControl>
        <FormControl maxW="500px">
          <FormLabel>Verbs</FormLabel>
          {selectMultiVerbComponent}
        </FormControl>
        <FormControl maxW="500px">
          <FormLabel>Users</FormLabel>
          {selectMultiUsersComponent}
        </FormControl>
      </HStack>
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
          getDateRow({
            id: "timestamp",
            label: "Timestamp",
          }),
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
            id: "createdAt",
            label: "Created At",
          }),
        ]}
      />
    </VStack>
  );
});
