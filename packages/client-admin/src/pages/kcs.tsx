import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { gql, KcInfoFragment, useGQLMutation, useGQLQuery } from "graph";
import { memo, useEffect, useRef } from "react";
import { MdAdd, MdEdit, MdSave } from "react-icons/md";
import { proxy, ref, useSnapshot } from "valtio";
import { withAdminAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { domainOptionLabel, useSelectSingleDomain } from "../hooks/domain";
import { useCursorPagination } from "../hooks/pagination";
import { queryClient } from "../rqClient";

gql(/* GraphQL */ `
  fragment KCInfo on KC {
    id
    code
    label
    domain {
      id
      code
      label
    }
    updatedAt
    createdAt
  }
`);

const KCsState = proxy<
  Record<
    string,
    KcInfoFragment & {
      isEditing?: boolean;
      labelRef: { current: string };
      codeRef: { current: string };
    }
  >
>({});

const CreateKC = memo(function CreateKC() {
  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  const { selectedDomain, selectSingleDomainComponent } =
    useSelectSingleDomain();

  const { mutateAsync } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation CreateKC($data: CreateKCInput!) {
        adminDomain {
          createKC(data: $data) {
            id
            label
            code
          }
        }
      }
    `),
    {
      async onSuccess() {
        await queryClient.invalidateQueries();
      },
    }
  );

  return (
    <FormModal
      title="Create KC"
      onSubmit={async () => {
        if (
          !codeRef.current?.value ||
          !labelRef.current?.value ||
          !selectedDomain
        )
          throw Error("All fields are required");

        await mutateAsync({
          data: {
            code: codeRef.current.value,
            label: labelRef.current.value,
            domainId: selectedDomain.value,
          },
        });

        queryClient.invalidateQueries();

        codeRef.current.value = "";
        labelRef.current.value = "";
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <MdAdd />,
      }}
    >
      <FormControl isRequired>
        <FormLabel>Associated Domain</FormLabel>

        {selectSingleDomainComponent}
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
});

export default withAdminAuth(function KCPage() {
  const { pageInfo, pagination, prevPage, nextPage } = useCursorPagination();

  const { selectedDomain, selectSingleDomainComponent } =
    useSelectSingleDomain();

  const { data } = useGQLQuery(
    gql(/* GraphQL */ `
      query AllKCs(
        $pagination: CursorConnectionArgs!
        $filters: AdminKCsFilter
      ) {
        adminDomain {
          allKCs(pagination: $pagination, filters: $filters) {
            nodes {
              ...KCInfo
            }
            ...Pagination
          }
        }
      }
    `),
    {
      pagination,
      filters: selectedDomain
        ? {
            domains: [selectedDomain.value],
          }
        : null,
    }
  );
  pageInfo.current = data?.adminDomain.allKCs.pageInfo;

  useEffect(() => {
    for (const domain of data?.adminDomain.allKCs.nodes || []) {
      const isEditing = KCsState[domain.id]?.isEditing;
      if (isEditing) continue;
      Object.assign(
        (KCsState[domain.id] ||= {
          ...domain,
          codeRef: ref({ current: domain.code }),
          labelRef: ref({ current: domain.label }),
        }),
        domain
      );
    }
  }, [data]);

  const kcsState = useSnapshot(KCsState);

  const updateKc = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpdateKC($data: UpdateKCInput!) {
        adminDomain {
          updateKC(data: $data) {
            __typename
          }
        }
      }
    `),
    {
      async onSuccess() {
        await queryClient.invalidateQueries();
      },
    }
  );

  return (
    <VStack>
      <CreateKC />

      {selectSingleDomainComponent}

      <DataTable<KcInfoFragment>
        data={data?.adminDomain.allKCs.nodes || []}
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
              const state = kcsState[id];

              if (!state) return value;

              if (state.isEditing) {
                const ref = KCsState[id]!.codeRef;
                return (
                  <Input
                    isDisabled={updateKc.isLoading}
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
              const state = kcsState[id];

              if (!state) return value;

              if (state.isEditing) {
                const ref = KCsState[id]!.labelRef;

                return (
                  <Input
                    isDisabled={updateKc.isLoading}
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
            id: "Domain",
            Header: "Domain",
            accessor(v) {
              return domainOptionLabel(v.domain);
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
              const state = kcsState[id];

              if (!state) return null;

              const {
                isEditing,
                codeRef,
                labelRef,
                domain: { id: domainId },
              } = state;

              return (
                <IconButton
                  aria-label="Edit"
                  colorScheme="blue"
                  isLoading={
                    updateKc.isLoading && updateKc.variables?.data.id === id
                  }
                  isDisabled={updateKc.isLoading}
                  onClick={() => {
                    if (
                      isEditing &&
                      (original.code !== codeRef.current ||
                        original.label !== labelRef.current ||
                        domainId !== original.domain.id)
                    ) {
                      updateKc
                        .mutateAsync({
                          data: {
                            id,
                            label: labelRef.current,
                            code: codeRef.current,
                          },
                        })
                        .then(() => {
                          KCsState[id]!.isEditing = false;
                        })
                        .catch(console.error);
                    } else {
                      KCsState[id]!.isEditing = !isEditing;
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
