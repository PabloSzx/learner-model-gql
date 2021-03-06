import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { formatSpanish } from "common";
import { gql, useGQLMutation } from "graph";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdEdit, MdOutlineTopic, MdSave } from "react-icons/md";
import { useDebounce, useUpdateEffect } from "react-use";
import useMountedState from "react-use/lib/useMountedState.js";
import { useImmer } from "use-immer";
import type { OptionValue } from "../components/AsyncSelect";
import { withAdminAuth } from "../components/Auth";
import { Card } from "../components/Card/Card";
import { CardContent } from "../components/Card/CardContent";
import { CardHeader } from "../components/Card/CardHeader";
import { Property } from "../components/Card/Property";
import { FormModal } from "../components/FormModal";
import { useTagsSelect } from "../components/TagsSelect";
import { contentOptionLabel, useSelectMultiContent } from "../hooks/content";
import { useSelectSingleProject } from "../hooks/projects";
import {
  TopicInfo,
  topicOptionLabel,
  useAllTopics,
  useSelectSingleTopic,
} from "../hooks/topics";
import { queryClient } from "../rqClient";

export const CreateTopic = () => {
  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  const { selectSingleProjectComponent, selectedProject } =
    useSelectSingleProject();

  const { mutateAsync, isLoading } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation CreateTopic($data: CreateTopic!) {
        adminDomain {
          createTopic(input: $data) {
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

  const parentTopic = useSelectSingleTopic({
    selectProps: useMemo(() => {
      return {
        isDisabled: !selectedProject,
      };
    }, [!selectedProject]),
    topics: {
      initialTopicsFilter: {
        projects: selectedProject ? [selectedProject.value] : [],
        textSearch: "",
      },
      limit: 100,
    },
  });

  const { tagsRef, tagsSelect } = useTagsSelect();

  const {
    selectMultiContentComponent,
    selectedContent,
    produceContentFilter,
    setSelectedContent,
  } = useSelectMultiContent({
    selectProps: {
      isDisabled: !selectedProject,
    },
    allContentBaseOptions: {
      initialContentFilter: {
        projects: selectedProject ? [selectedProject.value] : [],
        textSearch: "",
      },
      limit: 100,
    },
  });

  useEffect(() => {
    produceContentFilter((draft) => {
      draft.projects = selectedProject ? [selectedProject.value] : [];
    });
    setSelectedContent([]);
    parentTopic.produceTopicsFilter((draft) => {
      draft.projects = selectedProject ? [selectedProject.value] : [];
    });
    parentTopic.setSelectedTopic(null);
  }, [selectedProject]);

  return (
    <FormModal
      title="Create Topic"
      onSubmit={async () => {
        if (
          !codeRef.current?.value ||
          !labelRef.current?.value ||
          !selectedProject
        )
          throw Error("Code, label, project and domain are required");

        await mutateAsync({
          data: {
            projectId: selectedProject.value,
            code: codeRef.current.value,
            label: labelRef.current.value,
            contentIds: selectedContent.map((v) => v.value),
            parentTopicId: parentTopic.selectedTopic?.value,
            tags: tagsRef.current?.getValue().map((v) => v.value) || [],
          },
        });
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <MdOutlineTopic />,
      }}
      saveButton={{
        isDisabled: isLoading || !selectedProject,
      }}
    >
      <FormControl isRequired>
        <FormLabel>Associated Project</FormLabel>

        {selectSingleProjectComponent}
      </FormControl>

      <FormControl>
        <FormLabel>Parent Topic</FormLabel>

        {parentTopic.selectSingleTopicComponent}
      </FormControl>
      <FormControl>
        <FormLabel>Associated Content</FormLabel>

        {selectMultiContentComponent}
      </FormControl>
      <FormControl id="tags">
        <FormLabel>Tags</FormLabel>
        {tagsSelect}
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
};

export const TopicCard = memo(function TopicCard({
  topic,
  disableParentEdit,
}: {
  topic: TopicInfoWithChildrens;
  disableParentEdit: boolean;
}) {
  const { mutateAsync, isLoading } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpdateTopic($data: UpdateTopic!) {
        adminDomain {
          updateTopic(input: $data) {
            id
            code
            label
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

  const initForm = () => {
    return {
      topicEdit: topic,
      selectedTopic: (topic.parent
        ? { label: topicOptionLabel(topic.parent), value: topic.parent.id }
        : null) as null | OptionValue,
      selectedContent: topic.content.map((content) => ({
        label: contentOptionLabel(content),
        value: content.id,
      })),
      isEditing: false,
    };
  };

  const [{ topicEdit, isEditing, selectedTopic, selectedContent }, edit] =
    useImmer(initForm);

  useUpdateEffect(() => {
    edit(initForm);
  }, [topic.updatedAt]);

  const deepChildrensAndSelfIds = useMemo(() => {
    const ids = new Set<string>([topic.id]);

    const pendingChildrensList = topic.childrens ? [topic.childrens] : [];

    while (pendingChildrensList.length) {
      const childrenList = pendingChildrensList.shift();

      if (childrenList == null) continue;

      for (const children of childrenList) {
        ids.add(children.id);

        if (children.childrens?.length) {
          pendingChildrensList.push(children.childrens);
        }
      }
    }

    return ids;
  }, [topic]);

  const { tagsSelect, tagsRef } = useTagsSelect({
    defaultTags: topic.tags,
    selectProps: {
      isDisabled: !isEditing,
    },
  });

  const { selectSingleTopicComponent } = useSelectSingleTopic({
    state: [
      selectedTopic,
      (selected) => edit((draft) => void (draft.selectedTopic = selected)),
    ],
    topics: {
      jsFilter: useCallback(
        (topicValue: TopicInfo) => {
          return !deepChildrensAndSelfIds.has(topicValue.id);
        },
        [topic.id, deepChildrensAndSelfIds]
      ),
      limit: 100,
      initialTopicsFilter: {
        textSearch: "",
        projects: [topic.project.id],
      },
    },
  });

  const { selectMultiContentComponent } = useSelectMultiContent({
    state: [
      selectedContent,
      (value) =>
        edit((draft) => {
          draft.selectedContent = value;
        }),
    ],
    selectProps: {
      isDisabled: !isEditing,
      placeholder: isEditing
        ? "Search Content"
        : selectedContent.length
        ? "Search Content"
        : "No associated content",
    },
    allContentBaseOptions: {
      initialContentFilter: {
        textSearch: "",
        projects: [topic.project.id],
      },
      limit: 100,
    },
  });

  useUpdateEffect(() => {
    edit((draft) => {
      draft.selectedTopic = topic.parent
        ? { label: topicOptionLabel(topic.parent), value: topic.parent.id }
        : null;
      draft.topicEdit = topic;
    });
  }, [topic.code, topic.label, topic.parent?.id, edit]);

  const isMounted = useMountedState();

  return (
    <Card margin="0.2em !important" overflow="visible">
      <CardHeader
        title={topicOptionLabel(topic)}
        action={
          <IconButton
            marginX="0.5em"
            colorScheme="facebook"
            aria-label="Edit"
            isLoading={isLoading}
            isDisabled={isLoading}
            icon={isEditing ? <MdSave /> : <MdEdit />}
            onClick={() => {
              const tagsRefList =
                tagsRef.current?.getValue().map((v) => v.value) || [];

              if (
                isEditing &&
                (topicEdit.code !== topic.code ||
                  topicEdit.label !== topic.label ||
                  selectedTopic?.value !== topic.parent?.id ||
                  topicEdit.sortIndex !== topic.sortIndex ||
                  selectedContent.map((v) => v.value).join() !==
                    topic.content.map((v) => v.id).join() ||
                  topic.tags.join() !== tagsRefList?.join())
              ) {
                mutateAsync({
                  data: {
                    id: topic.id,
                    code: topicEdit.code,
                    label: topicEdit.label,
                    contentIds: selectedContent.map((v) => v.value),
                    parentTopicId: selectedTopic?.value,
                    sortIndex: topicEdit.sortIndex,
                    tags: tagsRefList,
                  },
                })
                  .then(() => {
                    if (isMounted()) {
                      edit((draft) => {
                        draft.isEditing = false;
                      });
                    }
                  })
                  .catch(console.error);
              } else {
                edit((draft) => {
                  draft.isEditing = !draft.isEditing;
                });
              }
            }}
          />
        }
      />

      <CardContent>
        <Property label="ID" value={topic.id} />
        <Property
          label="Code"
          value={
            isEditing ? (
              <Input
                value={topicEdit.code}
                onChange={(ev) => {
                  edit((draft) => {
                    draft.topicEdit.code = ev.target.value;
                  });
                }}
              />
            ) : (
              topic.code
            )
          }
        />
        <Property
          label="Label"
          value={
            isEditing ? (
              <Input
                value={topicEdit.label}
                onChange={(ev) => {
                  edit((draft) => {
                    draft.topicEdit.label = ev.target.value;
                  });
                }}
              />
            ) : (
              topic.label
            )
          }
        />
        <Property
          label="sortIndex"
          value={
            isEditing ? (
              <Input
                value={topicEdit.sortIndex ?? ""}
                type="number"
                onChange={(ev) => {
                  edit((draft) => {
                    draft.topicEdit.sortIndex = ev.target.valueAsNumber;
                  });
                }}
              />
            ) : (
              topic.sortIndex
            )
          }
        />
        <Property
          label="updatedAt"
          value={formatSpanish(new Date(topic.updatedAt), "PPpp O")}
        />
        <Property
          label="createdAt"
          value={formatSpanish(new Date(topic.createdAt), "PPpp O")}
        />
        <Property label="Tags" value={tagsSelect} />
        <Property
          label="Content"
          value={selectMultiContentComponent}
          maxW="min(70ch, 80vw)"
        />
        {isEditing && !disableParentEdit && (
          <Property label="Parent" value={selectSingleTopicComponent} />
        )}
        {topic.childrens?.length ? (
          <Property
            value={
              <TopicsCards
                topics={topic.childrens}
                disableParentEdit={disableParentEdit}
              />
            }
          />
        ) : null}
      </CardContent>
    </Card>
  );
});

export const TopicsCards = ({
  topics,
  disableParentEdit,
}: {
  topics: Array<TopicInfoWithChildrens>;
  disableParentEdit: boolean;
}) => {
  return (
    <>
      {topics.map((topic) => {
        return (
          <TopicCard
            key={topic.id}
            topic={topic}
            disableParentEdit={disableParentEdit}
          />
        );
      })}
    </>
  );
};

export default withAdminAuth(function TopicsPage() {
  const [textSearchValue, setTextSearchValue] = useState("");
  const [textSearch, setTextSearch] = useState("");

  const { topics, isFetching, produceTopicsFilter } = useAllTopics({
    initialTopicsFilter: {
      projects: [],
      textSearch,
    },
    limit: Infinity,
  });

  useDebounce(
    () => {
      setTextSearch(textSearchValue);
    },
    200,
    [textSearchValue]
  );

  const topicsTree = useMemo(() => {
    return textSearch ? topics : getTopicChildrens(topics);
  }, [topics, textSearch]);

  const { selectedProject, selectSingleProjectComponent } =
    useSelectSingleProject();

  useEffect(() => {
    produceTopicsFilter((draft) => {
      draft.projects = selectedProject ? [selectedProject.value] : [];
      draft.textSearch = textSearch;
    });
  }, [selectedProject, textSearch]);

  return (
    <VStack>
      <CreateTopic />

      <Flex>
        <FormControl>
          <FormLabel htmlFor="text-filter" textAlign="center">
            Specify Project
          </FormLabel>
          {selectSingleProjectComponent}
        </FormControl>
      </Flex>

      <Flex alignItems="center">
        <FormControl>
          <FormLabel htmlFor="text-filter">
            Filter by text in code or label, or by specific tag
          </FormLabel>
          <Input
            id="text-filter"
            type="text"
            value={textSearchValue}
            onChange={(ev) => {
              setTextSearchValue(ev.target.value);
            }}
            maxW="50ch"
          />
        </FormControl>
      </Flex>

      {isFetching && !topicsTree.length ? (
        <Spinner />
      ) : (
        <HStack
          wrap="wrap"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          <TopicsCards topics={topicsTree} disableParentEdit={!!textSearch} />
        </HStack>
      )}
    </VStack>
  );
});

export type TopicInfoWithChildrens = TopicInfo & {
  childrens?: Array<TopicInfoWithChildrens>;
};

export function getTopicChildrens(
  allTopics: TopicInfo[],
  topic?: TopicInfo
): Array<TopicInfoWithChildrens> {
  return allTopics.reduce<Array<TopicInfoWithChildrens>>((acum, topicValue) => {
    if (topicValue.parent?.id === topic?.id) {
      const childrens = getTopicChildrens(allTopics, topicValue);

      childrens.length > 1 &&
        childrens.sort(
          (a, b) => (a.sortIndex || -Infinity) - (b.sortIndex || -Infinity)
        );

      acum.push({
        ...topicValue,
        childrens,
      });
    }

    return acum;
  }, []);
}
