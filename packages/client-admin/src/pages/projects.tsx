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
  getKey,
  gql,
  ProjectInfoFragment,
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
import { queryClient } from "../rqClient";

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
        if (!codeRef.current?.value || !labelRef.current?.value)
          throw Error("All fields are required");

        await mutateAsync({
          data: {
            code: codeRef.current.value,
            label: labelRef.current.value,
          },
        });

        queryClient.invalidateQueries(getKey(AdminProjects));

        codeRef.current.value = "";
        labelRef.current.value = "";
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <MdAdd />,
      }}
    >
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

const ProjectsState = proxy<
  Record<
    string,
    ProjectInfoFragment & {
      isEditing?: boolean;
      labelRef: { current: string };
      codeRef: { current: string };
    }
  >
>({});

export default withAuth(function ProjectsPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();
  const { data } = useGQLQuery(AdminProjects, { pagination });
  pageInfo.current = data?.adminProjects.allProjects.pageInfo;

  useEffect(() => {
    for (const project of data?.adminProjects.allProjects.nodes || []) {
      const isEditing = ProjectsState[project.id]?.isEditing;
      if (isEditing) continue;
      Object.assign(
        (ProjectsState[project.id] ||= {
          ...project,
          codeRef: ref({ current: project.code }),
          labelRef: ref({ current: project.label }),
        }),
        project
      );
    }
  }, [data]);

  const projectsState = useSnapshot(ProjectsState);

  const updateProject = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpdateProject($data: UpdateProject!) {
        adminProjects {
          updateProject(data: $data) {
            __typename
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

  const toast = useToast();
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
            Cell({
              value,
              row: {
                original: { id },
              },
            }) {
              const projectState = projectsState[id];

              if (!projectState) return value;

              if (projectState.isEditing) {
                const ref = ProjectsState[id]!.codeRef;
                return (
                  <Input
                    isDisabled={updateProject.isLoading}
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
              const projectState = projectsState[id];

              if (!projectState) return value;

              if (projectState.isEditing) {
                const ref = ProjectsState[id]!.labelRef;

                return (
                  <Input
                    isDisabled={updateProject.isLoading}
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
              const projectState = projectsState[id];

              if (!projectState) return null;

              const { isEditing, codeRef, labelRef } = projectState;

              return (
                <IconButton
                  aria-label="Edit"
                  colorScheme="blue"
                  isLoading={
                    updateProject.isLoading &&
                    updateProject.variables?.data.id === id
                  }
                  isDisabled={updateProject.isLoading}
                  onClick={() => {
                    if (
                      isEditing &&
                      (original.code !== codeRef.current ||
                        original.label !== labelRef.current)
                    ) {
                      updateProject
                        .mutateAsync({
                          data: {
                            id,
                            code: codeRef.current,
                            label: labelRef.current,
                          },
                        })
                        .then(() => {
                          ProjectsState[id]!.isEditing = false;
                        })
                        .catch((err) => {
                          toast({
                            status: "error",
                            title: err.message,
                          });
                        });
                    } else {
                      ProjectsState[id]!.isEditing = !isEditing;
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
