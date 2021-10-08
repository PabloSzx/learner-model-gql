/* eslint-disable */
import * as graphql from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n          query hello {\n            hello\n          }\n        ":
    graphql.HelloDocument,
  "\n            mutation CreateAction($data: ActionInput!) {\n              action(data: $data)\n            }\n          ":
    graphql.CreateActionDocument,
  "\n            query AllActions($pagination: CursorConnectionArgs!) {\n              adminActions {\n                allActions(pagination: $pagination) {\n                  nodes {\n                    verb {\n                      name\n                    }\n\n                    result\n                    user {\n                      id\n                    }\n                  }\n                  pageInfo {\n                    hasNextPage\n                  }\n                }\n              }\n            }\n          ":
    graphql.AllActionsDocument,
  "\n        mutation CreateAction($data: ActionInput!) {\n          action(data: $data)\n        }\n      ":
    graphql.CreateActionDocument,
  "\n      query AllActions($pagination: CursorConnectionArgs!) {\n        adminActions {\n          allActions(pagination: $pagination) {\n            nodes {\n              verb {\n                name\n              }\n\n              result\n              user {\n                id\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ":
    graphql.AllActionsDocument,
  "\n          query AllContent($pagination: CursorConnectionArgs!) {\n            adminContent {\n              allContent(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    graphql.AllContentDocument,
  "\n          mutation CreateContent($data: CreateContent!) {\n            adminContent {\n              createContent(data: $data) {\n                id\n                description\n                binaryBase64\n                json\n              }\n            }\n          }\n        ":
    graphql.CreateContentDocument,
  "\n          query ContentFromDomain(\n            $ids: [IntID!]!\n            $pagination: CursorConnectionArgs!\n          ) {\n            domains(ids: $ids) {\n              id\n              content(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    graphql.ContentFromDomainDocument,
  "\n          query ContentFromTopic(\n            $ids: [IntID!]!\n            $pagination: CursorConnectionArgs!\n          ) {\n            topics(ids: $ids) {\n              id\n              content(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    graphql.ContentFromTopicDocument,
  "\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            description\n            binaryBase64\n            json\n          }\n        }\n      }\n    ":
    graphql.CreateContentDocument,
  "\n        query AllContent($pagination: CursorConnectionArgs!) {\n          adminContent {\n            allContent(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.AllContentDocument,
  "\n        query ContentFromDomain(\n          $ids: [IntID!]!\n          $pagination: CursorConnectionArgs!\n        ) {\n          domains(ids: $ids) {\n            id\n            content(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.ContentFromDomainDocument,
  "\n        query ContentFromTopic(\n          $ids: [IntID!]!\n          $pagination: CursorConnectionArgs!\n        ) {\n          topics(ids: $ids) {\n            id\n            content(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.ContentFromTopicDocument,
  "\n  fragment IsolatedDomainFields on Domain {\n    id\n    code\n    label\n  }\n":
    graphql.IsolatedDomainFieldsFragmentDoc,
  "\n  fragment IsolatedTopicFields on Topic {\n    id\n    code\n    label\n    domain {\n      id\n    }\n    parent {\n      id\n      domain {\n        id\n      }\n    }\n    childrens {\n      id\n      domain {\n        id\n      }\n    }\n  }\n":
    graphql.IsolatedTopicFieldsFragmentDoc,
  "\n      mutation CreateDomain($input: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    ":
    graphql.CreateDomainDocument,
  "\n        query AllDomains($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allDomains(pagination: $pagination) {\n              nodes {\n                ...IsolatedDomainFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.AllDomainsDocument,
  "\n      mutation UpdateDomain($input: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $input) {\n            ...IsolatedDomainFields\n          }\n        }\n      }\n    ":
    graphql.UpdateDomainDocument,
  "\n      mutation CreateTopic($input: CreateTopic!) {\n        adminDomain {\n          createTopic(input: $input) {\n            ...IsolatedTopicFields\n          }\n        }\n      }\n    ":
    graphql.CreateTopicDocument,
  "\n      query AllTopics($pagination: CursorConnectionArgs!) {\n        adminDomain {\n          allTopics(pagination: $pagination) {\n            nodes {\n              ...IsolatedTopicFields\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ":
    graphql.AllTopicsDocument,
  "\n        mutation UpdateTopic($input: UpdateTopic!) {\n          adminDomain {\n            updateTopic(input: $input) {\n              ...IsolatedTopicFields\n            }\n          }\n        }\n      ":
    graphql.UpdateTopicDocument,
  "\n        query AllTopics($pagination: CursorConnectionArgs!) {\n          adminDomain {\n            allTopics(pagination: $pagination) {\n              nodes {\n                ...IsolatedTopicFields\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.AllTopicsDocument,
  "\n      query DomainFromContent($ids: [IntID!]!) {\n        content(ids: $ids) {\n          id\n          domain {\n            id\n          }\n        }\n      }\n    ":
    graphql.DomainFromContentDocument,
  "\n      query DomainsFromProjects($ids: [IntID!]!) {\n        projects(ids: $ids) {\n          id\n          domains {\n            id\n          }\n        }\n      }\n    ":
    graphql.DomainsFromProjectsDocument,
  "\n        query AllKcsFirst10 {\n          adminDomain {\n            allKCs(pagination: { first: 10 }) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.AllKcsFirst10Document,
  "\n      mutation CreateKC($data: CreateKCInput!) {\n        adminDomain {\n          createKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    ":
    graphql.CreateKcDocument,
  "\n      mutation UpdateKC($data: UpdateKCInput!) {\n        adminDomain {\n          updateKC(data: $data) {\n            id\n            code\n            label\n            domain {\n              id\n            }\n          }\n        }\n      }\n    ":
    graphql.UpdateKcDocument,
  "\n      mutation AdminCreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            code\n            label\n          }\n        }\n      }\n    ":
    graphql.AdminCreateProjectDocument,
  "\n      query AdminAllProjects($pagination: CursorConnectionArgs!) {\n        adminProjects {\n          allProjects(pagination: $pagination) {\n            nodes {\n              id\n              code\n              label\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ":
    graphql.AdminAllProjectsDocument,
  "\n        mutation AdminUpdateProject($data: UpdateProject!) {\n          adminProjects {\n            updateProject(data: $data) {\n              id\n              code\n              label\n            }\n          }\n        }\n      ":
    graphql.AdminUpdateProjectDocument,
  "\n        query AdminAllProjects($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.AdminAllProjectsDocument,
  "\n      query AdminProjectFromContent($ids: [IntID!]!) {\n        content(ids: $ids) {\n          id\n          project {\n            id\n            code\n            label\n          }\n        }\n      }\n    ":
    graphql.AdminProjectFromContentDocument,
  "\n        query AdminProjectFromDomain($ids: [IntID!]!) {\n          domains(ids: $ids) {\n            id\n            project {\n              id\n              code\n              label\n            }\n          }\n        }\n      ":
    graphql.AdminProjectFromDomainDocument,
  "\n        query AdminProjectFromTopic($ids: [IntID!]!) {\n          topics(ids: $ids) {\n            id\n            project {\n              id\n              code\n              label\n            }\n          }\n        }\n      ":
    graphql.AdminProjectFromTopicDocument,
  "\n          query AdminProjectFromUser($ids: [IntID!]!) {\n            users(ids: $ids) {\n              id\n              projects {\n                id\n                code\n                label\n              }\n            }\n          }\n        ":
    graphql.AdminProjectFromUserDocument,
  "\n          query AdminProjectFromGroup($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              id\n              projects {\n                id\n              }\n            }\n          }\n        ":
    graphql.AdminProjectFromGroupDocument,
  "\n  fragment UserInfo on User {\n    id\n    enabled\n    email\n    name\n    locked\n    active\n    lastOnline\n    role\n    createdAt\n    updatedAt\n  }\n":
    graphql.UserInfoFragmentDoc,
  "\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    users {\n      id\n      email\n    }\n    projectsIds\n  }\n":
    graphql.GroupInfoFragmentDoc,
  "\n  fragment UserGroupsInfo on User {\n    id\n    email\n    groups {\n      ...GroupInfo\n    }\n  }\n":
    graphql.UserGroupsInfoFragmentDoc,
  "\n          query UsersById($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserInfo\n            }\n          }\n        ":
    graphql.UsersByIdDocument,
  "\n          query AdminAllUsers($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allUsers(pagination: $pagination) {\n                nodes {\n                  ...UserInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    graphql.AdminAllUsersDocument,
  "\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectsIds: [IntID!]!\n      ) {\n        adminUsers {\n          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {\n            ...UserInfo\n          }\n        }\n      }\n    ":
    graphql.UpsertUsersWithProjectsDocument,
  "\n        query AdminAllUsers($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allUsers(pagination: $pagination) {\n              nodes {\n                ...UserInfo\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      ":
    graphql.AdminAllUsersDocument,
  "\n        query CurrentUser {\n          currentUser {\n            ...UserInfo\n          }\n        }\n      ":
    graphql.CurrentUserDocument,
  "\n          query AdminAllGroups($pagination: CursorConnectionArgs!) {\n            adminUsers {\n              allGroups(pagination: $pagination) {\n                nodes {\n                  ...GroupInfo\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        ":
    graphql.AdminAllGroupsDocument,
  "\n          query GetGroups($ids: [IntID!]!) {\n            groups(ids: $ids) {\n              ...GroupInfo\n            }\n          }\n        ":
    graphql.GetGroupsDocument,
  "\n          query UsersGroups($ids: [IntID!]!) {\n            users(ids: $ids) {\n              ...UserGroupsInfo\n            }\n          }\n        ":
    graphql.UsersGroupsDocument,
  "\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            id\n            code\n            label\n            projectsIds\n            users {\n              id\n              email\n            }\n          }\n        }\n      }\n    ":
    graphql.SetUserGroupsDocument,
  "\n      mutation AdminCreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    ":
    graphql.AdminCreateGroupDocument,
  "\n      mutation AdminUpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            ...GroupInfo\n          }\n        }\n      }\n    ":
    graphql.AdminUpdateGroupDocument,
  "\n      mutation SetUserProjects($projectIds: [IntID!]!, $userIds: [IntID!]!) {\n        adminUsers {\n          setProjectsToUsers(projectIds: $projectIds, userIds: $userIds) {\n            id\n            email\n            projectsIds\n          }\n        }\n      }\n    ":
    graphql.SetUserProjectsDocument,
};

export function gql(
  source: "\n          query hello {\n            hello\n          }\n        "
): typeof documents["\n          query hello {\n            hello\n          }\n        "];
export function gql(
  source: "\n            mutation CreateAction($data: ActionInput!) {\n              action(data: $data)\n            }\n          "
): typeof documents["\n            mutation CreateAction($data: ActionInput!) {\n              action(data: $data)\n            }\n          "];
export function gql(
  source: "\n            query AllActions($pagination: CursorConnectionArgs!) {\n              adminActions {\n                allActions(pagination: $pagination) {\n                  nodes {\n                    verb {\n                      name\n                    }\n\n                    result\n                    user {\n                      id\n                    }\n                  }\n                  pageInfo {\n                    hasNextPage\n                  }\n                }\n              }\n            }\n          "
): typeof documents["\n            query AllActions($pagination: CursorConnectionArgs!) {\n              adminActions {\n                allActions(pagination: $pagination) {\n                  nodes {\n                    verb {\n                      name\n                    }\n\n                    result\n                    user {\n                      id\n                    }\n                  }\n                  pageInfo {\n                    hasNextPage\n                  }\n                }\n              }\n            }\n          "];
export function gql(
  source: "\n        mutation CreateAction($data: ActionInput!) {\n          action(data: $data)\n        }\n      "
): typeof documents["\n        mutation CreateAction($data: ActionInput!) {\n          action(data: $data)\n        }\n      "];
export function gql(
  source: "\n      query AllActions($pagination: CursorConnectionArgs!) {\n        adminActions {\n          allActions(pagination: $pagination) {\n            nodes {\n              verb {\n                name\n              }\n\n              result\n              user {\n                id\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "
): typeof documents["\n      query AllActions($pagination: CursorConnectionArgs!) {\n        adminActions {\n          allActions(pagination: $pagination) {\n            nodes {\n              verb {\n                name\n              }\n\n              result\n              user {\n                id\n              }\n            }\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n          query AllContent($pagination: CursorConnectionArgs!) {\n            adminContent {\n              allContent(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "
): typeof documents["\n          query AllContent($pagination: CursorConnectionArgs!) {\n            adminContent {\n              allContent(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n          mutation CreateContent($data: CreateContent!) {\n            adminContent {\n              createContent(data: $data) {\n                id\n                description\n                binaryBase64\n                json\n              }\n            }\n          }\n        "
): typeof documents["\n          mutation CreateContent($data: CreateContent!) {\n            adminContent {\n              createContent(data: $data) {\n                id\n                description\n                binaryBase64\n                json\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n          query ContentFromDomain(\n            $ids: [IntID!]!\n            $pagination: CursorConnectionArgs!\n          ) {\n            domains(ids: $ids) {\n              id\n              content(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "
): typeof documents["\n          query ContentFromDomain(\n            $ids: [IntID!]!\n            $pagination: CursorConnectionArgs!\n          ) {\n            domains(ids: $ids) {\n              id\n              content(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n          query ContentFromTopic(\n            $ids: [IntID!]!\n            $pagination: CursorConnectionArgs!\n          ) {\n            topics(ids: $ids) {\n              id\n              content(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "
): typeof documents["\n          query ContentFromTopic(\n            $ids: [IntID!]!\n            $pagination: CursorConnectionArgs!\n          ) {\n            topics(ids: $ids) {\n              id\n              content(pagination: $pagination) {\n                nodes {\n                  id\n                  description\n                  binaryBase64\n                  json\n                }\n                pageInfo {\n                  hasNextPage\n                }\n              }\n            }\n          }\n        "];
export function gql(
  source: "\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            description\n            binaryBase64\n            json\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            description\n            binaryBase64\n            json\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n        query AllContent($pagination: CursorConnectionArgs!) {\n          adminContent {\n            allContent(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllContent($pagination: CursorConnectionArgs!) {\n          adminContent {\n            allContent(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n        query ContentFromDomain(\n          $ids: [IntID!]!\n          $pagination: CursorConnectionArgs!\n        ) {\n          domains(ids: $ids) {\n            id\n            content(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query ContentFromDomain(\n          $ids: [IntID!]!\n          $pagination: CursorConnectionArgs!\n        ) {\n          domains(ids: $ids) {\n            id\n            content(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n        query ContentFromTopic(\n          $ids: [IntID!]!\n          $pagination: CursorConnectionArgs!\n        ) {\n          topics(ids: $ids) {\n            id\n            content(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "
): typeof documents["\n        query ContentFromTopic(\n          $ids: [IntID!]!\n          $pagination: CursorConnectionArgs!\n        ) {\n          topics(ids: $ids) {\n            id\n            content(pagination: $pagination) {\n              nodes {\n                id\n                description\n                binaryBase64\n                json\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n  fragment IsolatedDomainFields on Domain {\n    id\n    code\n    label\n  }\n"
): typeof documents["\n  fragment IsolatedDomainFields on Domain {\n    id\n    code\n    label\n  }\n"];
export function gql(
  source: "\n  fragment IsolatedTopicFields on Topic {\n    id\n    code\n    label\n    domain {\n      id\n    }\n    parent {\n      id\n      domain {\n        id\n      }\n    }\n    childrens {\n      id\n      domain {\n        id\n      }\n    }\n  }\n"
): typeof documents["\n  fragment IsolatedTopicFields on Topic {\n    id\n    code\n    label\n    domain {\n      id\n    }\n    parent {\n      id\n      domain {\n        id\n      }\n    }\n    childrens {\n      id\n      domain {\n        id\n      }\n    }\n  }\n"];
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
  source: "\n      query DomainFromContent($ids: [IntID!]!) {\n        content(ids: $ids) {\n          id\n          domain {\n            id\n          }\n        }\n      }\n    "
): typeof documents["\n      query DomainFromContent($ids: [IntID!]!) {\n        content(ids: $ids) {\n          id\n          domain {\n            id\n          }\n        }\n      }\n    "];
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
  source: "\n        query AdminProjectFromDomain($ids: [IntID!]!) {\n          domains(ids: $ids) {\n            id\n            project {\n              id\n              code\n              label\n            }\n          }\n        }\n      "
): typeof documents["\n        query AdminProjectFromDomain($ids: [IntID!]!) {\n          domains(ids: $ids) {\n            id\n            project {\n              id\n              code\n              label\n            }\n          }\n        }\n      "];
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
  source: "\n  fragment UserInfo on User {\n    id\n    enabled\n    email\n    name\n    locked\n    active\n    lastOnline\n    role\n    createdAt\n    updatedAt\n  }\n"
): typeof documents["\n  fragment UserInfo on User {\n    id\n    enabled\n    email\n    name\n    locked\n    active\n    lastOnline\n    role\n    createdAt\n    updatedAt\n  }\n"];
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

export function gql(source: string): DocumentNode;
export function gql(source: string) {
  return (documents as any)[source] ?? source;
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
