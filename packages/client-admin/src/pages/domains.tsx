import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  DomainInfoFragment,
  getKey,
  gql,
  useGQLMutation,
  useGQLQuery,
} from "graph/rq-gql";
import { useEffect, useRef } from "react";
import { MdAdd, MdEdit, MdSave } from "react-icons/md";
import { proxy, ref, useSnapshot } from "valtio";
import { withAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useCursorPagination } from "../hooks/pagination";
import { projectOptionLabel, useSelectSingleProject } from "../hooks/projects";
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
    project {
      id
      code
      label
    }
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

const DomainsState = proxy<
  Record<
    string,
    DomainInfoFragment & {
      isEditing?: boolean;
      labelRef: { current: string };
      codeRef: { current: string };
    }
  >
>({});

export default withAuth(function DomainPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();
  const { data } = useGQLQuery(AdminDomains, { pagination });
  pageInfo.current = data?.adminDomain.allDomains.pageInfo;

  useEffect(() => {
    for (const domain of data?.adminDomain.allDomains.nodes || []) {
      const isEditing = DomainsState[domain.id]?.isEditing;
      if (isEditing) continue;
      Object.assign(
        (DomainsState[domain.id] ||= {
          ...domain,
          codeRef: ref({ current: domain.code }),
          labelRef: ref({ current: domain.label }),
        }),
        domain
      );
    }
  }, [data]);

  const domainsState = useSnapshot(DomainsState);

  const updateDomain = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpdateDomain($data: UpdateDomain!) {
        adminDomain {
          updateDomain(input: $data) {
            __typename
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

  const toast = useToast();

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
            Cell({
              value,
              row: {
                original: { id },
              },
            }) {
              const domainState = domainsState[id];

              if (!domainState) return value;

              if (domainState.isEditing) {
                const ref = DomainsState[id]!.codeRef;
                return (
                  <Input
                    isDisabled={updateDomain.isLoading}
                    defaultValue={ref.current}
                    onChange={(ev) => {
                      ref.current = ev.target.value;
                    }}
                    colorScheme="facebook"
                    borderColor="blackAlpha.500"
                    width="20ch"
                  />
                );
              }

              return value;
            },
          },
          {
            Header: "Label",
            accessor: "label",
            Cell({
              value,
              row: {
                original: { id },
              },
            }) {
              const domainState = domainsState[id];

              if (!domainState) return value;

              if (domainState.isEditing) {
                const ref = DomainsState[id]!.labelRef;

                return (
                  <Input
                    isDisabled={updateDomain.isLoading}
                    defaultValue={ref.current}
                    onChange={(ev) => {
                      ref.current = ev.target.value;
                    }}
                    colorScheme="facebook"
                    borderColor="blackAlpha.500"
                    width="20ch"
                  />
                );
              }

              return value;
            },
          },
          {
            id: "project",
            Header: "Project",
            accessor: "project",
            Cell({ value }) {
              return projectOptionLabel(value);
            },
          },
          getDateRow({ id: "createdAt", label: "Created At" }),
          getDateRow({ id: "updatedAt", label: "Updated At" }),
          {
            id: "edit",
            Header: "Editar",
            defaultCanSort: false,
            defaultCanFilter: false,
            defaultCanGroupBy: false,
            accessor: "id",
            Cell({ value: id, row: { original } }) {
              const projectState = domainsState[id];

              if (!projectState) return null;

              const { isEditing, codeRef, labelRef } = projectState;

              return (
                <IconButton
                  aria-label="Edit"
                  colorScheme="blue"
                  isLoading={
                    updateDomain.isLoading &&
                    updateDomain.variables?.data.id === id
                  }
                  isDisabled={updateDomain.isLoading}
                  onClick={() => {
                    if (
                      isEditing &&
                      (original.code !== codeRef.current ||
                        original.label !== labelRef.current)
                    ) {
                      updateDomain
                        .mutateAsync({
                          data: {
                            id,
                            label: labelRef.current,
                            code: codeRef.current,
                          },
                        })
                        .then(() => {
                          DomainsState[id]!.isEditing = false;
                        })
                        .catch((err) => {
                          toast({
                            status: "error",
                            title: err.message,
                          });
                        });
                    } else {
                      DomainsState[id]!.isEditing = !isEditing;
                    }
                  }}
                  icon={isEditing ? <MdSave /> : <MdEdit />}
                />
              );
            },
          },
        ]}
      />
    </VStack>
  );
});
