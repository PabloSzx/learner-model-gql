import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  DomainInfoFragment,
  getKey,
  gql,
  useGQLMutation,
  useGQLQuery,
} from "graph/rq-gql";
import { useRef } from "react";
import { MdAdd } from "react-icons/md";
import { withAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useCursorPagination } from "../hooks/pagination";
import { useSelectSingleProject } from "../hooks/projects";
import { queryClient } from "../utils/rqClient";

function CreateDomain() {
  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  const { selectSingleProjectComponent, selectedProject } =
    useSelectSingleProject();

  const { mutateAsync } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation CreateDomain($data: CreateDomain!) {
        adminDomain {
          createDomain(input: $data) {
            id
            label
            code
          }
        }
      }
    `),
    {
      async onSuccess() {
        await queryClient.invalidateQueries(getKey(AdminDomains));
      },
    }
  );

  return (
    <FormModal
      title="Create Domain"
      onSubmit={async () => {
        if (
          !codeRef.current?.value ||
          !labelRef.current?.value ||
          !selectedProject
        )
          throw Error("All fields are required");

        await mutateAsync({
          data: {
            projectId: selectedProject.value,
            code: codeRef.current.value,
            label: labelRef.current.value,
          },
        });

        queryClient.invalidateQueries(getKey(AdminDomains));

        codeRef.current.value = "";
        labelRef.current.value = "";
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <MdAdd />,
      }}
    >
      <FormControl isRequired>
        <FormLabel>Associated Project</FormLabel>

        {selectSingleProjectComponent}
      </FormControl>
      <FormControl id="code" isRequired>
        <FormLabel>Code</FormLabel>
        <Input type="text" ref={codeRef} />
        <FormHelperText>
          Unique Code not intended to be showed to the users
        </FormHelperText>
      </FormControl>
      <FormControl id="label" isRequired>
        <FormLabel>Label</FormLabel>
        <Input type="text" ref={labelRef} />
        <FormHelperText>Human readable label</FormHelperText>
      </FormControl>
    </FormModal>
  );
}

gql(/* GraphQL */ `
  fragment DomainInfo on Domain {
    __typename
    id
    code
    label
    updatedAt
    createdAt
  }
`);

const AdminDomains = gql(/* GraphQL */ `
  query AllDomains($pagination: CursorConnectionArgs!) {
    adminDomain {
      allDomains(pagination: $pagination) {
        nodes {
          ...DomainInfo
        }
        ...Pagination
      }
    }
  }
`);

export default withAuth(function DomainPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();
  const { data } = useGQLQuery(AdminDomains, { pagination });
  pageInfo.current = data?.adminDomain.allDomains.pageInfo;

  return (
    <VStack>
      <CreateDomain />
      <DataTable<DomainInfoFragment>
        data={data?.adminDomain.allDomains.nodes || []}
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
