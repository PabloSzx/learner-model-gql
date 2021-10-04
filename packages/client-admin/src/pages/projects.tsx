import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  getKey,
  gql,
  ProjectInfoFragment,
  useGQLMutation,
  useGQLQuery,
} from "graph/rq-gql";
import { useRef } from "react";
import { withAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useCursorPagination } from "../hooks/pagination";
import { queryClient } from "../utils/rqClient";

gql(/* GraphQL */ `
  fragment ProjectInfo on Project {
    __typename
    id
    code
    label
    updatedAt
    createdAt
  }
`);

const AdminProjects = gql(/* GraphQL */ `
  query AllProjects($pagination: CursorConnectionArgs!) {
    adminProjects {
      allProjects(pagination: $pagination) {
        nodes {
          ...ProjectInfo
        }
        ...Pagination
      }
    }
  }
`);

function CreateProject() {
  const { mutateAsync } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation CreateProject($data: CreateProject!) {
        adminProjects {
          createProject(data: $data) {
            id
            label
            code
          }
        }
      }
    `),
    {
      async onSuccess() {
        await queryClient.invalidateQueries(getKey(AdminProjects));
      },
    }
  );

  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  return (
    <FormModal
      title="Create Project"
      onSubmit={async () => {
        if (!codeRef.current?.value || !labelRef.current?.value) return;

        await mutateAsync({
          data: {
            code: codeRef.current.value,
            label: codeRef.current.value,
          },
        });

        queryClient.invalidateQueries(getKey(AdminProjects));

        codeRef.current.value = "";
        labelRef.current.value = "";
      }}
    >
      <FormControl id="code">
        <FormLabel>Code</FormLabel>
        <Input type="text" ref={codeRef} />
        <FormHelperText>
          Unique Code not intended to be showed to the users
        </FormHelperText>
      </FormControl>
      <FormControl id="label">
        <FormLabel>Label</FormLabel>
        <Input type="text" ref={labelRef} />
        <FormHelperText>Human readable label</FormHelperText>
      </FormControl>
    </FormModal>
  );
}

export default withAuth(function ProjectsPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();
  const { data } = useGQLQuery(AdminProjects, { pagination });
  pageInfo.current = data?.adminProjects.allProjects.pageInfo;

  return (
    <VStack>
      <CreateProject />
      <DataTable<ProjectInfoFragment>
        data={data?.adminProjects.allProjects.nodes || []}
        prevPage={prevPage}
        nextPage={nextPage}
        minH="80vh"
        columns={[
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Code",
            accessor: "code",
          },
          {
            Header: "Label",
            accessor: "label",
          },
          getDateRow({ id: "createdAt", label: "Created At" }),
          getDateRow({ id: "updatedAt", label: "Created At" }),
        ]}
      />
    </VStack>
  );
});
