import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getKey, gql, useGQLMutation } from "graph/rq-gql";
import { useMemo, useRef } from "react";
import { MdOutlineTopic } from "react-icons/md";
import { withAuth } from "../components/Auth";
import { FormModal } from "../components/FormModal";
import { useSelectSingleDomain } from "../hooks/domain";
import { useSelectSingleProject } from "../hooks/projects";
import {
  AllTopicsBaseDoc,
  TopicInfo,
  useAllTopics,
  useSelectSingleTopic,
} from "../hooks/topics";
import { queryClient } from "../rqClient";

export const CreateTopic = () => {
  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  const { selectSingleProjectComponent, selectedProject } =
    useSelectSingleProject();

  const { selectSingleDomainComponent, selectedDomain } =
    useSelectSingleDomain();

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

  const parentTopic = useSelectSingleTopic();

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
      </FormControl>

      <FormControl>
        <FormLabel>Parent Topic</FormLabel>

        {parentTopic.selectSingleTopicComponent}
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

export default withAuth(function TopicsPage() {
  const { topics } = useAllTopics();

  const topicsTree = useMemo(() => {
    return getTopicChildrens(topics);
  }, [topics]);

  return (
    <VStack>
      <CreateTopic />

      <Text whiteSpace="pre-wrap">{JSON.stringify(topicsTree, null, 2)}</Text>
    </VStack>
  );
});

export function getTopicChildrens(
  allTopics: TopicInfo[],
  topic?: TopicInfo
): Array<TopicInfo & { childrens: Array<TopicInfo> }> {
  return allTopics.reduce<Array<TopicInfo & { childrens: Array<TopicInfo> }>>(
    (acum, topicValue) => {
      if (topicValue.parent?.id === topic?.id) {
        acum.push({
          ...topicValue,
          childrens: getTopicChildrens(allTopics, topicValue),
        });
      }

      return acum;
    },
    []
  );
}
