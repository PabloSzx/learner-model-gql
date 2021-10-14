import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { getKey, gql, useGQLMutation } from "graph/rq-gql";
import { memo, useEffect, useMemo, useRef } from "react";
import { MdEdit, MdOutlineTopic, MdSave } from "react-icons/md";
import { useUpdateEffect } from "react-use";
import { useImmer } from "use-immer";
import { withAuth } from "../components/Auth";
import { Card } from "../components/Card/Card";
import { CardContent } from "../components/Card/CardContent";
import { CardHeader } from "../components/Card/CardHeader";
import { Property } from "../components/Card/Property";
import { FormModal } from "../components/FormModal";
import { domainOptionLabel, useSelectSingleDomain } from "../hooks/domain";
import { useSelectSingleProject } from "../hooks/projects";
import {
  AllTopicsBaseDoc,
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

  const {
    selectSingleDomainComponent,
    selectedDomain,
    setSelectedDomain,
    produceDomainsFilter,
  } = useSelectSingleDomain({
    selectProps: {
      isDisabled: !selectedProject,
    },
  });

  useEffect(() => {
    setSelectedDomain(null);
    produceDomainsFilter((draft) => {
      if (!selectedProject) return null;

      if (!draft)
        return {
          projects: [selectedProject.value],
        };

      draft.projects = [selectedProject.value];

      return;
    });
  }, [selectedProject]);

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
        await queryClient.invalidateQueries(getKey(AllTopicsBaseDoc));
      },
    }
  );

  const parentTopic = useSelectSingleTopic({
    selectProps: useMemo(() => {
      return {
        isDisabled: !selectedDomain,
      };
    }, [!selectedDomain]),
  });

  useEffect(() => {
    parentTopic.setSelectedTopic(null);
    parentTopic.produceTopicsFilter((draft) => {
      if (!selectedDomain) return null;

      if (!draft)
        return {
          domains: [selectedDomain.value],
        };

      draft.domains = [selectedDomain.value];

      return;
    });
  }, [selectedDomain]);

  return (
    <FormModal
      title="Create Topic"
      onSubmit={async () => {
        if (
          !codeRef.current?.value ||
          !labelRef.current?.value ||
          !selectedProject ||
          !selectedDomain
        )
          throw Error("Code, label, project and domain are required");

        await mutateAsync({
          data: {
            projectId: selectedProject.value,
            code: codeRef.current.value,
            label: labelRef.current.value,
            contentIds: [],
            domainId: selectedDomain.value,
            parentTopicId: parentTopic.selectedTopic?.value,
          },
        });
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <MdOutlineTopic />,
      }}
      saveButton={{
        isDisabled: isLoading || !selectedProject || !selectedDomain,
      }}
    >
      <FormControl isRequired>
        <FormLabel>Associated Project</FormLabel>

        {selectSingleProjectComponent}
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Associated Domain</FormLabel>

        {selectSingleDomainComponent}
        {!selectedProject && (
          <FormHelperText>You have to select a project first</FormHelperText>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>Parent Topic</FormLabel>

        {parentTopic.selectSingleTopicComponent}
        {!selectedDomain && (
          <FormHelperText>You have to select a domain first</FormHelperText>
        )}
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
}: {
  topic: TopicInfoWithChildrens;
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
        await queryClient.invalidateQueries(getKey(AllTopicsBaseDoc));
      },
    }
  );

  const [{ topicEdit, isEditing, selectedTopic }, edit] = useImmer(() => {
    return {
      topicEdit: topic,
      selectedTopic: (topic.parent
        ? { label: topicOptionLabel(topic.parent), value: topic.parent.id }
        : null) as null | { value: string; label: string },
      isEditing: false,
    };
  });

  const { selectSingleTopicComponent, produceTopicsFilter } =
    useSelectSingleTopic({
      state: [
        selectedTopic,
        (selected) => edit((draft) => void (draft.selectedTopic = selected)),
      ],
    });

  useEffect(() => {
    produceTopicsFilter({ domains: [topic.domain.id] });
  }, [topic.domain.id]);

  useUpdateEffect(() => {
    edit((draft) => {
      draft.selectedTopic = topic.parent
        ? { label: topicOptionLabel(topic.parent), value: topic.parent.id }
        : null;
      draft.topicEdit = topic;
    });
  }, [topic.code, topic.label, topic.parent?.id, edit]);

  const toast = useToast();

  return (
    <Card key={topic.id} margin="0.2em !important" overflow="visible">
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
              if (
                isEditing &&
                (topicEdit.code !== topic.code ||
                  topicEdit.label !== topic.label ||
                  selectedTopic?.value !== topic.parent?.id ||
                  topicEdit.sortIndex !== topic.sortIndex)
              ) {
                mutateAsync({
                  data: {
                    id: topic.id,
                    code: topicEdit.code,
                    label: topicEdit.label,
                    contentIds: [],
                    domainId: topic.domain.id,
                    parentTopicId: selectedTopic?.value,
                    sortIndex: topicEdit.sortIndex,
                  },
                })
                  .then(() => {
                    edit((draft) => {
                      draft.isEditing = false;
                    });
                  })
                  .catch((err) => {
                    toast({
                      status: "error",
                      title: err.message,
                    });
                  });
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
                value={topicEdit.sortIndex || ""}
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
        {isEditing && (
          <Property label="Parent" value={selectSingleTopicComponent} />
        )}
        <Property label="Domain" value={domainOptionLabel(topic.domain)} />
        {topic.childrens.length ? (
          <Property value={<TopicsCards topics={topic.childrens} />} />
        ) : null}
      </CardContent>
    </Card>
  );
});

export const TopicsCards = ({
  topics,
}: {
  topics: Array<TopicInfoWithChildrens>;
}) => {
  return (
    <>
      {topics.map((topic) => {
        return <TopicCard key={topic.id} topic={topic} />;
      })}
    </>
  );
};

export default withAuth(function TopicsPage() {
  const { topics, isLoading } = useAllTopics();

  const topicsTree = useMemo(() => {
    return getTopicChildrens(topics);
  }, [topics]);

  return (
    <VStack>
      <CreateTopic />

      {isLoading ? (
        <Spinner />
      ) : (
        <HStack wrap="wrap" justifyContent="space-around" alignItems="center">
          <TopicsCards topics={topicsTree} />
        </HStack>
      )}
    </VStack>
  );
});

export type TopicInfoWithChildrens = TopicInfo & {
  childrens: Array<TopicInfoWithChildrens>;
};

export function getTopicChildrens(
  allTopics: TopicInfo[],
  topic?: TopicInfo
): Array<TopicInfoWithChildrens> {
  return allTopics.reduce<Array<TopicInfoWithChildrens>>((acum, topicValue) => {
    if (topicValue.parent?.id === topic?.id) {
      acum.push({
        ...topicValue,
        childrens: getTopicChildrens(allTopics, topicValue),
      });
    }

    return acum;
  }, []);
}
