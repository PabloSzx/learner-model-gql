import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
  useUpdateEffect,
  VStack,
} from "@chakra-ui/react";
import { ContentInfoFragment, gql, useGQLMutation, useGQLQuery } from "graph";
import mime from "mime";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { MdAdd, MdDownload, MdEdit } from "react-icons/md";
import { serializeError } from "serialize-error";
import { useImmer } from "use-immer";
import { AsyncSelect, AsyncSelectProps } from "../components/AsyncSelect";
import { withAdminAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useJSONEditor } from "../components/jsonEditor";
import { useTagsSelect } from "../components/TagsSelect";
import { kcOptionLabel, useSelectMultiKCs } from "../hooks/kcs";
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
    binaryBase64
    binaryFilename
    json
    url
    project {
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

function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    if (mime.getType(file.name) == null)
      return reject(Error("Invalid file type"));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string")
        return reject("File could not be encoded to base64!");
      const base64String = reader.result.split(",")[1];

      if (typeof base64String !== "string")
        return reject("File could not be encoded to base64!");
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

const CreateContent = memo(function CreateContent() {
  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { selectedProject, selectSingleProjectComponent } =
    useSelectSingleProject();

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
    `)
  );

  const { tagsRef, tagsSelect } = useTagsSelect();

  const fileRef = useRef<HTMLInputElement>(null);

  const jsonEditor = useJSONEditor();

  const urlRef = useRef<HTMLInputElement>(null);

  const [selectProps, setSelectProps] = useState<Partial<AsyncSelectProps>>(
    () => {
      return {
        isDisabled: !selectedProject,
      };
    }
  );

  const {
    selectMultiKCComponent,
    selectedKCs,
    produceKCsFilter,
    isFetching: isKcsFetching,
    setSelectedKCs,
  } = useSelectMultiKCs({
    selectProps,
    kcsBase: {
      initialKcsFilter: {
        textSearch: "",
      },
      limit: 100,
    },
  });

  useEffect(() => {
    setSelectProps({
      isDisabled: !selectedProject || isKcsFetching,
    });
  }, [isKcsFetching || !selectedProject]);

  useEffect(() => {
    produceKCsFilter((draft) => {
      draft.projects = selectedProject ? [selectedProject.value] : null;
    });
    setSelectedKCs([]);
  }, [selectedProject?.value]);

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
            description: descriptionRef.current.value,
            kcs: selectedKCs.map((v) => v.value),
            tags: tagsRef.current?.getValue().map((v) => v.value) || [],
            topics: [],
            binaryBase64,
            binaryFilename: file?.name,
            json: jsonEditor.parsedJson || null,
            url: urlRef.current?.value || null,
          },
        });

        codeRef.current.value = "";
        labelRef.current.value = "";
      }}
      modalProps={{
        closeOnOverlayClick: false,
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
      <FormControl id="description" isRequired>
        <FormLabel>Description</FormLabel>
        <Input type="text" ref={descriptionRef} />
        <FormHelperText>Detailed description of content</FormHelperText>
      </FormControl>
      <FormControl id="kcs">
        <FormLabel>KCs</FormLabel>
        {selectMultiKCComponent}
      </FormControl>
      <FormControl id="tags">
        <FormLabel>Tags</FormLabel>
        {tagsSelect}
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

const EditContent = ({
  row: { original: content },
}: {
  row: { original: ContentInfoFragment };
}) => {
  const oldBinaryContentType = useMemo(() => {
    return content.binaryBase64 && content.binaryFilename
      ? mime.getType(content.binaryFilename)
      : null;
  }, [content.binaryBase64, content.binaryFilename]);
  function initForm() {
    const { code, label, description, kcs } = content;
    return {
      code,
      label,
      description,
      kcs: kcs.map((kc) => ({ label: kcOptionLabel(kc), value: kc.id })),
      updateFile: oldBinaryContentType ? false : true,
    };
  }
  const [form, produceForm] = useImmer(initForm);

  const toast = useToast();

  useUpdateEffect(() => {
    produceForm(initForm);
  }, [content.updatedAt, content.kcs.map((v) => v.id).join()]);

  const { tagsSelect, tagsRef } = useTagsSelect({
    defaultTags: content.tags,
  });

  const { id } = content;

  const { selectMultiKCComponent, produceKCsFilter } = useSelectMultiKCs({
    state: [
      form.kcs,
      (value) =>
        produceForm((draft) => {
          draft.kcs = value;
        }),
    ],
    kcsBase: {
      initialKcsFilter: {
        textSearch: "",
      },
      limit: 100,
    },
  });

  useEffect(() => {
    produceKCsFilter({
      projects: [content.project.id],
    });
  }, [content.project.id]);

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

  const fileRef = useRef<HTMLInputElement>(null);

  const defaultJson = useMemo(
    () => (content.json ? JSON.stringify(content.json) : undefined),
    [content.json]
  );

  const jsonEditor = useJSONEditor({
    defaultJson,
  });

  useUpdateEffect(() => {
    jsonEditor.setJson(defaultJson || "");
  }, [defaultJson]);

  const urlRef = useRef<HTMLInputElement>(null);

  return (
    <FormModal
      onSubmit={async () => {
        const { code, label, description, kcs, updateFile } = form;

        const file = fileRef.current?.files?.[0];

        const binaryBase64 = updateFile
          ? file
            ? await getBase64(file).catch((err) => {
                toast({
                  status: "error",
                  title: err.message || JSON.stringify(serializeError(err)),
                });

                throw err;
              })
            : null
          : content.binaryBase64;

        await updateContent.mutateAsync({
          data: {
            id,
            code,
            label,
            description,
            kcs: kcs.map((v) => v.value),
            projectId: content.project.id,
            tags: tagsRef.current?.getValue().map((v) => v.value) || [],
            topics: content.topics.map((v) => v.id),
            binaryBase64,
            binaryFilename: updateFile ? file?.name : content.binaryFilename,
            json: jsonEditor.parsedJson || null,
            url: urlRef.current?.value || null,
          },
        });
      }}
      title="Edit Content"
      triggerButton={{
        leftIcon: <MdEdit />,
        colorScheme: "facebook",
        children: null,
        sx: {
          span: {
            margin: "0px",
          },
        },
      }}
      saveButton={{
        children: "Save Changes",
      }}
      modalProps={{
        closeOnOverlayClick: false,
      }}
    >
      {() => {
        return (
          <>
            <FormControl id="code">
              <FormLabel>Code</FormLabel>
              <Input
                type="text"
                value={form.code}
                onChange={(ev) => {
                  produceForm((draft) => {
                    draft.code = ev.target.value;
                  });
                }}
              />
            </FormControl>
            <FormControl id="label">
              <FormLabel>Label</FormLabel>
              <Input
                type="text"
                value={form.label}
                onChange={(ev) => {
                  produceForm((draft) => {
                    draft.label = ev.target.value;
                  });
                }}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={form.description}
                onChange={(ev) => {
                  produceForm((draft) => {
                    draft.description = ev.target.value;
                  });
                }}
              />
            </FormControl>
            <FormControl id="tags">
              <FormLabel>Tags</FormLabel>
              {tagsSelect}
            </FormControl>
            <FormControl id="kcs" minW="250px">
              <FormLabel>KCs</FormLabel>

              {selectMultiKCComponent}
            </FormControl>

            <FormControl>
              <FormLabel>Binary Content</FormLabel>
              {oldBinaryContentType ? (
                <FormControl id="existingBase64">
                  <Button
                    width="full"
                    as="a"
                    download={content.binaryFilename}
                    href={`data:${oldBinaryContentType};base64,${content.binaryBase64}`}
                    target="_blank"
                    leftIcon={<MdDownload />}
                  >
                    Download current content file
                  </Button>
                </FormControl>
              ) : null}
              {oldBinaryContentType && (
                <Checkbox
                  checked={form.updateFile}
                  onChange={() =>
                    produceForm((draft) => {
                      draft.updateFile = !draft.updateFile;
                    })
                  }
                  borderColor="#555"
                >
                  Should update binary content
                </Checkbox>
              )}
              {form.updateFile && (
                <Input
                  type="file"
                  ref={fileRef}
                  lineHeight="2rem"
                  sx={{ textAlignLast: "center" }}
                />
              )}
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
              <Input
                type="url"
                ref={urlRef}
                defaultValue={content.url || undefined}
              />
              <FormHelperText>Custom External URL</FormHelperText>
            </FormControl>
          </>
        );
      }}
    </FormModal>
  );
};

export default withAdminAuth(function ContentPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();

  const { data } = useGQLQuery(
    gql(/* GraphQL */ `
      query AllContent(
        $pagination: CursorConnectionArgs!
        $filters: AdminContentFilter
      ) {
        adminContent {
          allContent(pagination: $pagination, filters: $filters) {
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
          },
          {
            Header: "Label",
            accessor: "label",
          },
          {
            id: "Project",
            Header: "Project",
            accessor(v) {
              return projectOptionLabel(v.project);
            },
          },

          {
            id: "Tags",
            Header: "Tags",
            accessor: (v) => v.tags.join(" | ") || "-",
          },
          {
            id: "KCs",
            Header: "KCs",
            accessor: "id",
            Cell({
              row: {
                original: { kcs },
              },
            }) {
              return (
                <Box minW={kcs.length ? "250px" : undefined}>
                  <AsyncSelect
                    isMulti
                    placeholder="No KCs"
                    value={kcs.map((kc) => ({
                      label: kcOptionLabel(kc),
                      value: kc.id,
                    }))}
                    isDisabled
                  />
                </Box>
              );
            },
          },
          getDateRow({ id: "createdAt", label: "Created At" }),
          getDateRow({ id: "updatedAt", label: "Updated At" }),
          {
            id: "edit",
            Header: "Edit",
            defaultCanSort: false,
            defaultCanFilter: false,
            defaultCanGroupBy: false,
            accessor: "id",
            Cell: EditContent,
          },
        ]}
      />
    </VStack>
  );
});
