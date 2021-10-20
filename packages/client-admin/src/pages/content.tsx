import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ContentInfoFragment, gql, useGQLMutation, useGQLQuery } from "graph";
import truncate from "lodash/truncate.js";
import { memo, useEffect, useRef } from "react";
import { MdAdd, MdEdit, MdSave } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import type Select from "react-select/dist/declarations/src/Select";
import { proxy, ref, useSnapshot } from "valtio";
import { withAdminAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useJSONEditor } from "../components/jsonEditor";
import { domainOptionLabel, useSelectSingleDomain } from "../hooks/domain";
import { useCursorPagination } from "../hooks/pagination";
import { projectOptionLabel, useSelectSingleProject } from "../hooks/projects";
import { queryClient } from "../rqClient";

gql(/* GraphQL */ `
  fragment ContentInfo on Content {
    id
    code
    label
    description
    tags
    project {
      id
      code
      label
    }
    domain {
      id
      code
      label
    }
    kcs {
      id
      code
      label
    }
    topics {
      id
    }
    updatedAt
    createdAt
  }
`);

const ContentState = proxy<
  Record<
    string,
    ContentInfoFragment & {
      isEditing?: boolean;
      labelRef: { current: string };
      codeRef: { current: string };
      descriptionRef: { current: string };
      tagsRef: {
        current: Select<{ label: string; value: string }, true> | null;
      };
    }
  >
>({});

function getBase64(file: File) {
  return new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const CreateContent = memo(function CreateContent() {
  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { selectedProject, selectSingleProjectComponent } =
    useSelectSingleProject();
  const { selectedDomain, selectSingleDomainComponent } =
    useSelectSingleDomain();

  const { mutateAsync } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation CreateContent($data: CreateContent!) {
        adminContent {
          createContent(data: $data) {
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

  const tagsRef = useRef<Select<{ label: string; value: string }, true>>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const jsonEditor = useJSONEditor();

  const urlRef = useRef<HTMLInputElement>(null);

  return (
    <FormModal
      title="Create Content"
      onSubmit={async () => {
        if (jsonEditor.json && !jsonEditor.isValid) {
          throw Error("Invalid JSON");
        }

        if (
          !codeRef.current?.value ||
          !labelRef.current?.value ||
          !selectedProject ||
          !selectedDomain ||
          !descriptionRef.current?.value
        )
          throw Error("All fields are required");

        const file = fileRef.current?.files?.[0];

        const binaryBase64 = file
          ? (await getBase64(file)) ||
            (() => {
              throw Error("File could not be encoded to base64!");
            })()
          : null;

        await mutateAsync({
          data: {
            projectId: selectedProject.value,
            code: codeRef.current.value,
            label: labelRef.current.value,
            domainId: selectedDomain.value,
            description: descriptionRef.current.value,
            kcs: [],
            tags: tagsRef.current?.getValue().map((v) => v.value) || [],
            topics: [],
            binaryBase64,
            json: jsonEditor.parsedJson || null,
            url: urlRef.current?.value || null,
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
        <FormLabel>Associated Project</FormLabel>

        {selectSingleProjectComponent}
      </FormControl>
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
      <FormControl id="description" isRequired>
        <FormLabel>Description</FormLabel>
        <Input type="text" ref={descriptionRef} />
        <FormHelperText>Detailed description of content</FormHelperText>
      </FormControl>
      <FormControl id="tags">
        <FormLabel>Tags</FormLabel>
        <CreatableSelect<{ label: string; value: string }, true>
          ref={tagsRef}
          placeholder="Tags"
          isMulti
          noOptionsMessage={() => `Start writing to create a new tag!`}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Binary Content</FormLabel>
        <Input
          type="file"
          ref={fileRef}
          lineHeight="2rem"
          sx={{ textAlignLast: "center" }}
        />
        <FormHelperText>
          The file is going to be encoded to base64
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>JSON</FormLabel>
        {jsonEditor.jsonEditor}
        <FormHelperText>JSON Object</FormHelperText>
      </FormControl>
      <FormControl id="url">
        <FormLabel>URL</FormLabel>
        <Input type="url" ref={urlRef} />
        <FormHelperText>Custom External URL</FormHelperText>
      </FormControl>
    </FormModal>
  );
});

export default withAdminAuth(function ContentPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();
  const { data } = useGQLQuery(
    gql(/* GraphQL */ `
      query AllContent($pagination: CursorConnectionArgs!) {
        adminContent {
          allContent(pagination: $pagination) {
            nodes {
              ...ContentInfo
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
  pageInfo.current = data?.adminContent.allContent.pageInfo;

  useEffect(() => {
    for (const content of data?.adminContent.allContent.nodes || []) {
      const isEditing = ContentState[content.id]?.isEditing;
      if (isEditing) continue;
      Object.assign(
        (ContentState[content.id] ||= {
          ...content,
          codeRef: ref({ current: content.code }),
          labelRef: ref({ current: content.label }),
          descriptionRef: ref({ current: content.label }),
          tagsRef: ref({ current: null }),
        }),
        content
      );
    }
  }, [data]);

  const contentsState = useSnapshot(ContentState);

  const updateContent = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpdateContent($data: UpdateContent!) {
        adminContent {
          updateContent(data: $data) {
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
      <CreateContent />
      <DataTable<ContentInfoFragment>
        data={data?.adminContent.allContent.nodes || []}
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
              const state = contentsState[id];

              if (!state) return value;

              if (state.isEditing) {
                const ref = ContentState[id]!.codeRef;
                return (
                  <Input
                    isDisabled={updateContent.isLoading}
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
              const state = contentsState[id];

              if (!state) return value;

              if (state.isEditing) {
                const ref = ContentState[id]!.labelRef;

                return (
                  <Input
                    isDisabled={updateContent.isLoading}
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
            Header: "Description",
            accessor: "description",
            Cell({
              value,
              row: {
                original: { id },
              },
            }) {
              const truncatedValue = truncate(value, {
                length: 30,
              });
              const contentState = contentsState[id];

              if (!contentState) return truncatedValue;

              if (contentState.isEditing) {
                const ref = ContentState[id]!.descriptionRef;

                return (
                  <Input
                    isDisabled={updateContent.isLoading}
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

              return truncatedValue;
            },
          },
          {
            id: "Project",
            Header: "Project",
            accessor(v) {
              return projectOptionLabel(v.project);
            },
          },
          {
            id: "Domain",
            Header: "Domain",
            accessor(v) {
              return domainOptionLabel(v.domain);
            },
          },
          {
            id: "Tags",
            Header: "Tags",
            accessor: "id",
            Cell({
              row: {
                original: { id, tags },
              },
            }) {
              const contentState = ContentState[id];

              if (!contentState) return tags.join(" | ");

              if (contentState.isEditing) {
                return (
                  <Box minW="250px">
                    <CreatableSelect<{ label: string; value: string }, true>
                      ref={contentState.tagsRef}
                      placeholder="Tags"
                      isMulti
                      noOptionsMessage={() =>
                        `Start writing to create a new tag!`
                      }
                      defaultValue={tags.map((value) => ({
                        label: value,
                        value,
                      }))}
                    />
                  </Box>
                );
              }
              return tags.join(" | ");
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
              const contentState = contentsState[id];

              if (!contentState) return null;

              const {
                isEditing,
                codeRef,
                labelRef,
                descriptionRef,
                domain: { id: domainId },
                project: { id: projectId },
                tagsRef,
                kcs,
                topics,
              } = contentState;

              return (
                <IconButton
                  aria-label="Edit"
                  colorScheme="blue"
                  isLoading={
                    updateContent.isLoading &&
                    updateContent.variables?.data.id === id
                  }
                  isDisabled={updateContent.isLoading}
                  onClick={() => {
                    const tagsRefList =
                      tagsRef.current?.getValue().map((v) => v.value) || [];
                    if (
                      isEditing &&
                      (original.code !== codeRef.current ||
                        original.label !== labelRef.current ||
                        descriptionRef.current !== original.description ||
                        tagsRefList.join() !== original.tags.join())
                    ) {
                      updateContent
                        .mutateAsync({
                          data: {
                            id,
                            label: labelRef.current,
                            code: codeRef.current,
                            description: descriptionRef.current,
                            domainId,
                            projectId,
                            tags: tagsRefList,
                            kcs: kcs.map((v) => v.id),
                            topics: topics.map((v) => v.id),
                          },
                        })
                        .then(() => {
                          ContentState[id]!.isEditing = false;
                        })
                        .catch(console.error);
                    } else {
                      ContentState[id]!.isEditing = !isEditing;
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
