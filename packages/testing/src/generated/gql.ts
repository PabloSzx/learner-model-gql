/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n          query hello {\n            hello\n          }\n        ":
    types.helloDocument,
  "\n            mutation CreateAction($data: ActionInput!) {\n              action(data: $data)\n            }\n          ":
    types.CreateActionDocument,
  "\n            query AllActions($pagination: CursorConnectionArgs!) {\n              adminActions {\n                allActions(pagination: $pagination) {\n                  nodes {\n                    verb {\n                      name\n                    }\n                    result\n                    user {\n                      id\n                    }\n                  }\n                  pageInfo {\n                    hasNextPage\n                  }\n                }\n              }\n            }\n          ":
    types.AllActionsDocument,
  "\n  mutation CreateAction($data: ActionInput!) {\n    action(data: $data)\n  }\n":
    types.CreateActionDocument,
  "\n      query AllActions($pagination: CursorConnectionArgs!) {\n        adminActions {\n          allActions(pagination: $pagination) {\n            nodes {\n              verb {\n                name\n              }\n              result\n              user {\n                id\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ":
    types.AllActionsDocument,
  "\n      query ProjectActions(\n        $projectId: IntID!\n        $pagination: CursorConnectionArgs!\n        $filters: ProjectActionsFilter\n      ) {\n        projects(ids: [$projectId]) {\n          id\n          actions(pagination: $pagination, filters: $filters) {\n            nodes {\n              id\n              verb {\n                name\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ":
    types.ProjectActionsDocument,
  "\n          query AllContent($pagination: CursorConnectionArgs!) {\n            adminContent {\n              allContent(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    types.AllContentDocument,
  "\n          mutation CreateContent($data: CreateContent!) {\n            adminContent {\n              createContent(data: $data) {\n                id\n                description\n                binaryBase64\n                json\n                code\n                label\n              }\n            }\n          }\n        ":
    types.CreateContentDocument,
  "\n          query ContentFromTopic($ids: [IntID!]!) {\n            topics(ids: $ids) {\n              id\n              content {\n                id\n                description\n                binaryBase64\n                json\n              }\n            }\n          }\n        ":
    types.ContentFromTopicDocument,
  "\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            description\n            binaryBase64\n            json\n            code\n            label\n          }\n        }\n      }\n    ":
    types.CreateContentDocument,
  "\n        query AllContent($pagination: CursorConnectionArgs!) {\n          adminContent {\n            allContent(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    types.AllContentDocument,
  "\n        query ContentFromTopic($ids: [IntID!]!) {\n          topics(ids: $ids) {\n            id\n            content {\n              id\n              description\n              binaryBase64\n              json\n            }\n          }\n        }\n      ":
    types.ContentFromTopicDocument,
  "\n  fragment IsolatedDomainFields on Domain {\n    id\n    code\n    label\n  }\n":
    types.IsolatedDomainFieldsFragmentDoc,
  "\n  fragment IsolatedTopicFields on Topic {\n    id\n    code\n    label\n    parent {\n      id\n    }\n    childrens {\n      id\n    }\n  }\n":
    types.IsolatedTopicFieldsFragmentDoc,
  "\n      mutation CreateDomain($input: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    ":
    types.CreateDomainDocument,
  "\n        query AllDomains($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allDomains(pagination: $pagination) {\n              nodes {\n                ...IsolatedDomainFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    types.AllDomainsDocument,
  "\n      mutation UpdateDomain($input: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    ":
    types.UpdateDomainDocument,
  "\n      mutation CreateTopic($input: CreateTopic!) {\n        adminDomain {\n          createTopic(input: $input) {\n            ...IsolatedTopicFields\n          }\n        }\n      }\n    ":
    types.CreateTopicDocument,
  "\n      query AllTopics($pagination: CursorConnectionArgs!) {\n        adminDomain {\n          allTopics(pagination: $pagination) {\n            nodes {\n              ...IsolatedTopicFields\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ":
    types.AllTopicsDocument,
  "\n        mutation UpdateTopic($input: UpdateTopic!) {\n          adminDomain {\n            updateTopic(input: $input) {\n              ...IsolatedTopicFields\n            }\n          }\n        }\n      ":
    types.UpdateTopicDocument,
  "\n        query AllTopics($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allTopics(pagination: $pagination) {\n              nodes {\n                ...IsolatedTopicFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    types.AllTopicsDocument,
  "\n      query DomainsFromProjects($ids: [IntID!]!) {\n        projects(ids: $ids) {\n          id\n          domains {\n            id\n          }\n        }\n      }\n    ":
    types.DomainsFromProjectsDocument,
  "\n        query AllKcsFirst10 {\n          adminDomain {\n            allKCs(pagination: { first: 10 }) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    types.AllKcsFirst10Document,
  "\n      mutation CreateKC($data: CreateKCInput!) {\n        adminDomain {\n          createKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    ":
    types.CreateKCDocument,
  "\n      mutation UpdateKC($data: UpdateKCInput!) {\n        adminDomain {\n          updateKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    ":
    types.UpdateKCDocument,
  "\n      query ChecksKcsWithoutRelations($ids: [IntID!]!) {\n        kcs(ids: $ids) {\n          id\n          relations {\n            id\n          }\n        }\n      }\n    ":
    types.ChecksKcsWithoutRelationsDocument,
  "\n      mutation SetKCRelations($data: KCRelationInput!) {\n        adminDomain {\n          setKCRelation(data: $data) {\n            id\n            kcA {\n              id\n            }\n            kcB {\n              id\n            }\n            type\n            label\n            comment\n          }\n        }\n      }\n    ":
    types.SetKCRelationsDocument,
  "\n      query ChecksKcsWithRelations($ids: [IntID!]!) {\n        kcs(ids: $ids) {\n          id\n          relations {\n            id\n            kcA {\n              id\n            }\n            kcB {\n              id\n            }\n            type\n          }\n        }\n      }\n    ":
    types.ChecksKcsWithRelationsDocument,
  "\n      mutation UnsetKCRelations($data: KCRelationInput!) {\n        adminDomain {\n          unsetKCRelation(data: $data)\n        }\n      }\n    ":
    types.UnsetKCRelationsDocument,
  "\n      mutation AdminCreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            code\n            label\n          }\n        }\n      }\n    ":
    types.AdminCreateProjectDocument,
  "\n      query AdminAllProjects($pagination: CursorConnectionArgs!) {\n        adminProjects {\n          allProjects(pagination: $pagination) {\n            nodes {\n              id\n              code\n              label\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ":
    types.AdminAllProjectsDocument,
  "\n        mutation AdminUpdateProject($data: UpdateProject!) {\n          adminProjects {\n            updateProject(data: $data) {\n              id\n              code\n              label\n            }\n          }\n        }\n      ":
    types.AdminUpdateProjectDocument,
  "\n        query AdminAllProjects($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    types.AdminAllProjectsDocument,
  "\n      query AdminProjectFromContent($ids: [IntID!]!) {\n        content(ids: $ids) {\n          id\n          project {\n            id\n            code\n            label\n          }\n        }\n      }\n    ":
    types.AdminProjectFromContentDocument,
  "\n        query AdminProjectFromDomain($ids: [IntID!]!) {\n          domains(ids: $ids) {\n            id\n            projects {\n              id\n              code\n              label\n            }\n          }\n        }\n      ":
    types.AdminProjectFromDomainDocument,
  "\n        query AdminProjectFromTopic($ids: [IntID!]!) {\n          topics(ids: $ids) {\n            id\n            project {\n              id\n              code\n              label\n            }\n          }\n        }\n      ":
    types.AdminProjectFromTopicDocument,
  "\n          query AdminProjectFromUser($ids: [IntID!]!) {\n            users(ids: $ids) {\n              id\n              projects {\n                id\n                code\n                label\n              }\n            }\n          }\n        ":
    types.AdminProjectFromUserDocument,
  "\n          query AdminProjectFromGroup($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              id\n              projects {\n                id\n              }\n            }\n          }\n        ":
    types.AdminProjectFromGroupDocument,
  "\n      query AllStatesTest {\n        adminState {\n          allModelStates(input: { pagination: { first: 10 } }) {\n            pageInfo {\n              hasNextPage\n            }\n            nodes {\n              id\n              json\n              creator\n              type\n              user {\n                id\n              }\n              domain {\n                id\n              }\n            }\n          }\n        }\n      }\n    ":
    types.AllStatesTestDocument,
  "\n  fragment UserInfo on User {\n    id\n    email\n    name\n    locked\n    active\n    lastOnline\n    role\n    createdAt\n    updatedAt\n  }\n":
    types.UserInfoFragmentDoc,
  "\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    users {\n      id\n      email\n    }\n    projectsIds\n  }\n":
    types.GroupInfoFragmentDoc,
  "\n  fragment UserGroupsInfo on User {\n    id\n    email\n    groups {\n      ...GroupInfo\n    }\n  }\n":
    types.UserGroupsInfoFragmentDoc,
  "\n          query UsersById($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserInfo\n            }\n          }\n        ":
    types.UsersByIdDocument,
  "\n          query AdminAllUsers($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allUsers(pagination: $pagination) {\n                nodes {\n                  ...UserInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    types.AdminAllUsersDocument,
  "\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectsIds: [IntID!]!\n      ) {\n        adminUsers {\n          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {\n            ...UserInfo\n          }\n        }\n      }\n    ":
    types.UpsertUsersWithProjectsDocument,
  "\n        query AdminAllUsers($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allUsers(pagination: $pagination) {\n              nodes {\n                ...UserInfo\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    types.AdminAllUsersDocument,
  "\n        query CurrentUser {\n          currentUser {\n            ...UserInfo\n          }\n        }\n      ":
    types.CurrentUserDocument,
  "\n          query AdminAllGroups($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allGroups(pagination: $pagination) {\n                nodes {\n                  ...GroupInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    types.AdminAllGroupsDocument,
  "\n          query GetGroups($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              ...GroupInfo\n            }\n          }\n        ":
    types.GetGroupsDocument,
  "\n          query UsersGroups($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserGroupsInfo\n            }\n          }\n        ":
    types.UsersGroupsDocument,
  "\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            id\n            code\n            label\n            projectsIds\n            users {\n              id\n              email\n            }\n          }\n        }\n      }\n    ":
    types.SetUserGroupsDocument,
  "\n      mutation AdminCreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    ":
    types.AdminCreateGroupDocument,
  "\n      mutation AdminUpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    ":
    types.AdminUpdateGroupDocument,
  "\n      mutation SetUserProjects($projectIds: [IntID!]!, $userIds: [IntID!]!) {\n        adminUsers {\n          setProjectsToUsers(projectIds: $projectIds, userIds: $userIds) {\n            id\n            email\n            projectsIds\n          }\n        }\n      }\n    ":
    types.SetUserProjectsDocument,
  "\n      query LoadTestCurrentUser($projectId: IntID!) {\n        currentUser {\n          id\n          email\n        }\n        project(id: $projectId) {\n          id\n          code\n          label\n          topics {\n            id\n            code\n            label\n          }\n          content(pagination: { first: 50 }) {\n            nodes {\n              id\n              code\n              label\n              tags\n              kcs {\n                id\n                code\n                label\n              }\n            }\n          }\n        }\n      }\n    ":
    types.LoadTestCurrentUserDocument,
  "\n        mutation LoadTestAction($data: ActionInput!) {\n          action(data: $data)\n        }\n      ":
    types.LoadTestActionDocument,
  "\n            query hello {\n              hello\n            }\n          ":
    types.helloDocument,
};

export function gql(
  source: "\n          query hello {\n            hello\n          }\n        "
): typeof documents["\n          query hello {\n            hello\n          }\n        "];
export function gql(
  source: "\n            mutation CreateAction($data: ActionInput!) {\n              action(data: $data)\n            }\n          "
): typeof documents["\n            mutation CreateAction($data: ActionInput!) {\n              action(data: $data)\n            }\n          "];
export function gql(
  source: "\n            query AllActions($pagination: CursorConnectionArgs!) {\n              adminActions {\n                allActions(pagination: $pagination) {\n                  nodes {\n                    verb {\n                      name\n                    }\n                    result\n                    user {\n                      id\n                    }\n                  }\n                  pageInfo {\n                    hasNextPage\n                  }\n                }\n              }\n            }\n          "
): typeof documents["\n            query AllActions($pagination: CursorConnectionArgs!) {\n              adminActions {\n                allActions(pagination: $pagination) {\n                  nodes {\n                    verb {\n                      name\n                    }\n                    result\n                    user {\n                      id\n                    }\n                  }\n                  pageInfo {\n                    hasNextPage\n                  }\n                }\n              }\n            }\n          "];
export function gql(
  source: "\n  mutation CreateAction($data: ActionInput!) {\n    action(data: $data)\n  }\n"
): typeof documents["\n  mutation CreateAction($data: ActionInput!) {\n    action(data: $data)\n  }\n"];
export function gql(
  source: "\n      query AllActions($pagination: CursorConnectionArgs!) {\n        adminActions {\n          allActions(pagination: $pagination) {\n            nodes {\n              verb {\n                name\n              }\n              result\n              user {\n                id\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      query AllActions($pagination: CursorConnectionArgs!) {\n        adminActions {\n          allActions(pagination: $pagination) {\n            nodes {\n              verb {\n                name\n              }\n              result\n              user {\n                id\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query ProjectActions(\n        $projectId: IntID!\n        $pagination: CursorConnectionArgs!\n        $filters: ProjectActionsFilter\n      ) {\n        projects(ids: [$projectId]) {\n          id\n          actions(pagination: $pagination, filters: $filters) {\n            nodes {\n              id\n              verb {\n                name\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      query ProjectActions(\n        $projectId: IntID!\n        $pagination: CursorConnectionArgs!\n        $filters: ProjectActionsFilter\n      ) {\n        projects(ids: [$projectId]) {\n          id\n          actions(pagination: $pagination, filters: $filters) {\n            nodes {\n              id\n              verb {\n                name\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n          query AllContent($pagination: CursorConnectionArgs!) {\n            adminContent {\n              allContent(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "
): typeof documents["\n          query AllContent($pagination: CursorConnectionArgs!) {\n            adminContent {\n              allContent(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n          mutation CreateContent($data: CreateContent!) {\n            adminContent {\n              createContent(data: $data) {\n                id\n                description\n                binaryBase64\n                json\n                code\n                label\n              }\n            }\n          }\n        "
): typeof documents["\n          mutation CreateContent($data: CreateContent!) {\n            adminContent {\n              createContent(data: $data) {\n                id\n                description\n                binaryBase64\n                json\n                code\n                label\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n          query ContentFromTopic($ids: [IntID!]!) {\n            topics(ids: $ids) {\n              id\n              content {\n                id\n                description\n                binaryBase64\n                json\n              }\n            }\n          }\n        "
): typeof documents["\n          query ContentFromTopic($ids: [IntID!]!) {\n            topics(ids: $ids) {\n              id\n              content {\n                id\n                description\n                binaryBase64\n                json\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            description\n            binaryBase64\n            json\n            code\n            label\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            description\n            binaryBase64\n            json\n            code\n            label\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        query AllContent($pagination: CursorConnectionArgs!) {\n          adminContent {\n            allContent(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllContent($pagination: CursorConnectionArgs!) {\n          adminContent {\n            allContent(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n        query ContentFromTopic($ids: [IntID!]!) {\n          topics(ids: $ids) {\n            id\n            content {\n              id\n              description\n              binaryBase64\n              json\n            }\n          }\n        }\n      "
): typeof documents["\n        query ContentFromTopic($ids: [IntID!]!) {\n          topics(ids: $ids) {\n            id\n            content {\n              id\n              description\n              binaryBase64\n              json\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n  fragment IsolatedDomainFields on Domain {\n    id\n    code\n    label\n  }\n"
): typeof documents["\n  fragment IsolatedDomainFields on Domain {\n    id\n    code\n    label\n  }\n"];
export function gql(
  source: "\n  fragment IsolatedTopicFields on Topic {\n    id\n    code\n    label\n    parent {\n      id\n    }\n    childrens {\n      id\n    }\n  }\n"
): typeof documents["\n  fragment IsolatedTopicFields on Topic {\n    id\n    code\n    label\n    parent {\n      id\n    }\n    childrens {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n      mutation CreateDomain($input: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateDomain($input: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        query AllDomains($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allDomains(pagination: $pagination) {\n              nodes {\n                ...IsolatedDomainFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllDomains($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allDomains(pagination: $pagination) {\n              nodes {\n                ...IsolatedDomainFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n      mutation UpdateDomain($input: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateDomain($input: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation CreateTopic($input: CreateTopic!) {\n        adminDomain {\n          createTopic(input: $input) {\n            ...IsolatedTopicFields\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateTopic($input: CreateTopic!) {\n        adminDomain {\n          createTopic(input: $input) {\n            ...IsolatedTopicFields\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query AllTopics($pagination: CursorConnectionArgs!) {\n        adminDomain {\n          allTopics(pagination: $pagination) {\n            nodes {\n              ...IsolatedTopicFields\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      query AllTopics($pagination: CursorConnectionArgs!) {\n        adminDomain {\n          allTopics(pagination: $pagination) {\n            nodes {\n              ...IsolatedTopicFields\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        mutation UpdateTopic($input: UpdateTopic!) {\n          adminDomain {\n            updateTopic(input: $input) {\n              ...IsolatedTopicFields\n            }\n          }\n        }\n      "
): typeof documents["\n        mutation UpdateTopic($input: UpdateTopic!) {\n          adminDomain {\n            updateTopic(input: $input) {\n              ...IsolatedTopicFields\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n        query AllTopics($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allTopics(pagination: $pagination) {\n              nodes {\n                ...IsolatedTopicFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllTopics($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allTopics(pagination: $pagination) {\n              nodes {\n                ...IsolatedTopicFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n      query DomainsFromProjects($ids: [IntID!]!) {\n        projects(ids: $ids) {\n          id\n          domains {\n            id\n          }\n        }\n      }\n    "
): typeof documents["\n      query DomainsFromProjects($ids: [IntID!]!) {\n        projects(ids: $ids) {\n          id\n          domains {\n            id\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        query AllKcsFirst10 {\n          adminDomain {\n            allKCs(pagination: { first: 10 }) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllKcsFirst10 {\n          adminDomain {\n            allKCs(pagination: { first: 10 }) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n      mutation CreateKC($data: CreateKCInput!) {\n        adminDomain {\n          createKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateKC($data: CreateKCInput!) {\n        adminDomain {\n          createKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateKC($data: UpdateKCInput!) {\n        adminDomain {\n          updateKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateKC($data: UpdateKCInput!) {\n        adminDomain {\n          updateKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query ChecksKcsWithoutRelations($ids: [IntID!]!) {\n        kcs(ids: $ids) {\n          id\n          relations {\n            id\n          }\n        }\n      }\n    "
): typeof documents["\n      query ChecksKcsWithoutRelations($ids: [IntID!]!) {\n        kcs(ids: $ids) {\n          id\n          relations {\n            id\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation SetKCRelations($data: KCRelationInput!) {\n        adminDomain {\n          setKCRelation(data: $data) {\n            id\n            kcA {\n              id\n            }\n            kcB {\n              id\n            }\n            type\n            label\n            comment\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation SetKCRelations($data: KCRelationInput!) {\n        adminDomain {\n          setKCRelation(data: $data) {\n            id\n            kcA {\n              id\n            }\n            kcB {\n              id\n            }\n            type\n            label\n            comment\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query ChecksKcsWithRelations($ids: [IntID!]!) {\n        kcs(ids: $ids) {\n          id\n          relations {\n            id\n            kcA {\n              id\n            }\n            kcB {\n              id\n            }\n            type\n          }\n        }\n      }\n    "
): typeof documents["\n      query ChecksKcsWithRelations($ids: [IntID!]!) {\n        kcs(ids: $ids) {\n          id\n          relations {\n            id\n            kcA {\n              id\n            }\n            kcB {\n              id\n            }\n            type\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UnsetKCRelations($data: KCRelationInput!) {\n        adminDomain {\n          unsetKCRelation(data: $data)\n        }\n      }\n    "
): typeof documents["\n      mutation UnsetKCRelations($data: KCRelationInput!) {\n        adminDomain {\n          unsetKCRelation(data: $data)\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation AdminCreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            code\n            label\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation AdminCreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            code\n            label\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query AdminAllProjects($pagination: CursorConnectionArgs!) {\n        adminProjects {\n          allProjects(pagination: $pagination) {\n            nodes {\n              id\n              code\n              label\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      query AdminAllProjects($pagination: CursorConnectionArgs!) {\n        adminProjects {\n          allProjects(pagination: $pagination) {\n            nodes {\n              id\n              code\n              label\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        mutation AdminUpdateProject($data: UpdateProject!) {\n          adminProjects {\n            updateProject(data: $data) {\n              id\n              code\n              label\n            }\n          }\n        }\n      "
): typeof documents["\n        mutation AdminUpdateProject($data: UpdateProject!) {\n          adminProjects {\n            updateProject(data: $data) {\n              id\n              code\n              label\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n        query AdminAllProjects($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query AdminAllProjects($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n      query AdminProjectFromContent($ids: [IntID!]!) {\n        content(ids: $ids) {\n          id\n          project {\n            id\n            code\n            label\n          }\n        }\n      }\n    "
): typeof documents["\n      query AdminProjectFromContent($ids: [IntID!]!) {\n        content(ids: $ids) {\n          id\n          project {\n            id\n            code\n            label\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        query AdminProjectFromDomain($ids: [IntID!]!) {\n          domains(ids: $ids) {\n            id\n            projects {\n              id\n              code\n              label\n            }\n          }\n        }\n      "
): typeof documents["\n        query AdminProjectFromDomain($ids: [IntID!]!) {\n          domains(ids: $ids) {\n            id\n            projects {\n              id\n              code\n              label\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n        query AdminProjectFromTopic($ids: [IntID!]!) {\n          topics(ids: $ids) {\n            id\n            project {\n              id\n              code\n              label\n            }\n          }\n        }\n      "
): typeof documents["\n        query AdminProjectFromTopic($ids: [IntID!]!) {\n          topics(ids: $ids) {\n            id\n            project {\n              id\n              code\n              label\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n          query AdminProjectFromUser($ids: [IntID!]!) {\n            users(ids: $ids) {\n              id\n              projects {\n                id\n                code\n                label\n              }\n            }\n          }\n        "
): typeof documents["\n          query AdminProjectFromUser($ids: [IntID!]!) {\n            users(ids: $ids) {\n              id\n              projects {\n                id\n                code\n                label\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n          query AdminProjectFromGroup($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              id\n              projects {\n                id\n              }\n            }\n          }\n        "
): typeof documents["\n          query AdminProjectFromGroup($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              id\n              projects {\n                id\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n      query AllStatesTest {\n        adminState {\n          allModelStates(input: { pagination: { first: 10 } }) {\n            pageInfo {\n              hasNextPage\n            }\n            nodes {\n              id\n              json\n              creator\n              type\n              user {\n                id\n              }\n              domain {\n                id\n              }\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      query AllStatesTest {\n        adminState {\n          allModelStates(input: { pagination: { first: 10 } }) {\n            pageInfo {\n              hasNextPage\n            }\n            nodes {\n              id\n              json\n              creator\n              type\n              user {\n                id\n              }\n              domain {\n                id\n              }\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment UserInfo on User {\n    id\n    email\n    name\n    locked\n    active\n    lastOnline\n    role\n    createdAt\n    updatedAt\n  }\n"
): typeof documents["\n  fragment UserInfo on User {\n    id\n    email\n    name\n    locked\n    active\n    lastOnline\n    role\n    createdAt\n    updatedAt\n  }\n"];
export function gql(
  source: "\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    users {\n      id\n      email\n    }\n    projectsIds\n  }\n"
): typeof documents["\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    users {\n      id\n      email\n    }\n    projectsIds\n  }\n"];
export function gql(
  source: "\n  fragment UserGroupsInfo on User {\n    id\n    email\n    groups {\n      ...GroupInfo\n    }\n  }\n"
): typeof documents["\n  fragment UserGroupsInfo on User {\n    id\n    email\n    groups {\n      ...GroupInfo\n    }\n  }\n"];
export function gql(
  source: "\n          query UsersById($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserInfo\n            }\n          }\n        "
): typeof documents["\n          query UsersById($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserInfo\n            }\n          }\n        "];
export function gql(
  source: "\n          query AdminAllUsers($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allUsers(pagination: $pagination) {\n                nodes {\n                  ...UserInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "
): typeof documents["\n          query AdminAllUsers($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allUsers(pagination: $pagination) {\n                nodes {\n                  ...UserInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectsIds: [IntID!]!\n      ) {\n        adminUsers {\n          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {\n            ...UserInfo\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectsIds: [IntID!]!\n      ) {\n        adminUsers {\n          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {\n            ...UserInfo\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        query AdminAllUsers($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allUsers(pagination: $pagination) {\n              nodes {\n                ...UserInfo\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query AdminAllUsers($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allUsers(pagination: $pagination) {\n              nodes {\n                ...UserInfo\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n        query CurrentUser {\n          currentUser {\n            ...UserInfo\n          }\n        }\n      "
): typeof documents["\n        query CurrentUser {\n          currentUser {\n            ...UserInfo\n          }\n        }\n      "];
export function gql(
  source: "\n          query AdminAllGroups($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allGroups(pagination: $pagination) {\n                nodes {\n                  ...GroupInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "
): typeof documents["\n          query AdminAllGroups($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allGroups(pagination: $pagination) {\n                nodes {\n                  ...GroupInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n          query GetGroups($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              ...GroupInfo\n            }\n          }\n        "
): typeof documents["\n          query GetGroups($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              ...GroupInfo\n            }\n          }\n        "];
export function gql(
  source: "\n          query UsersGroups($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserGroupsInfo\n            }\n          }\n        "
): typeof documents["\n          query UsersGroups($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserGroupsInfo\n            }\n          }\n        "];
export function gql(
  source: "\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            id\n            code\n            label\n            projectsIds\n            users {\n              id\n              email\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            id\n            code\n            label\n            projectsIds\n            users {\n              id\n              email\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation AdminCreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation AdminCreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation AdminUpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation AdminUpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation SetUserProjects($projectIds: [IntID!]!, $userIds: [IntID!]!) {\n        adminUsers {\n          setProjectsToUsers(projectIds: $projectIds, userIds: $userIds) {\n            id\n            email\n            projectsIds\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation SetUserProjects($projectIds: [IntID!]!, $userIds: [IntID!]!) {\n        adminUsers {\n          setProjectsToUsers(projectIds: $projectIds, userIds: $userIds) {\n            id\n            email\n            projectsIds\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query LoadTestCurrentUser($projectId: IntID!) {\n        currentUser {\n          id\n          email\n        }\n        project(id: $projectId) {\n          id\n          code\n          label\n          topics {\n            id\n            code\n            label\n          }\n          content(pagination: { first: 50 }) {\n            nodes {\n              id\n              code\n              label\n              tags\n              kcs {\n                id\n                code\n                label\n              }\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      query LoadTestCurrentUser($projectId: IntID!) {\n        currentUser {\n          id\n          email\n        }\n        project(id: $projectId) {\n          id\n          code\n          label\n          topics {\n            id\n            code\n            label\n          }\n          content(pagination: { first: 50 }) {\n            nodes {\n              id\n              code\n              label\n              tags\n              kcs {\n                id\n                code\n                label\n              }\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        mutation LoadTestAction($data: ActionInput!) {\n          action(data: $data)\n        }\n      "
): typeof documents["\n        mutation LoadTestAction($data: ActionInput!) {\n          action(data: $data)\n        }\n      "];
export function gql(
  source: "\n            query hello {\n              hello\n            }\n          "
): typeof documents["\n            query hello {\n              hello\n            }\n          "];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
