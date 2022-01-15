/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import * as graphql from "./graphql";

const documents = {
  "\n      query currentUser {\n        currentUser {\n          id\n          email\n          name\n          role\n          picture\n        }\n      }\n    ":
    graphql.CurrentUserDocument,
  "\n        query AllVerbNames($pagination: CursorConnectionArgs!) {\n          adminActions {\n            allActionsVerbs(pagination: $pagination) {\n              nodes {\n                id\n                name\n              }\n              ...Pagination\n            }\n          }\n        }\n      ":
    graphql.AllVerbNamesDocument,
  "\n  query AllContentBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminContentFilter\n  ) {\n    adminContent {\n      allContent(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n          tags\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllContentBaseDocument,
  "\n  query AllDomainsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminDomainsFilter\n  ) {\n    adminDomain {\n      allDomains(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllDomainsBaseDocument,
  "\n        query AllGroupsBase($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allGroups(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      ":
    graphql.AllGroupsBaseDocument,
  "\n  query AllKCsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminKCsFilter\n  ) {\n    adminDomain {\n      allKCs(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllKCsBaseDocument,
  "\n  fragment Pagination on Connection {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n":
    graphql.PaginationFragmentDoc,
  "\n        query AllProjectsBase($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      ":
    graphql.AllProjectsBaseDocument,
  "\n  query AllTopicsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminTopicsFilter\n  ) {\n    adminDomain {\n      allTopics(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n          sortIndex\n          parent {\n            id\n            code\n            label\n          }\n          project {\n            id\n            code\n            label\n          }\n          content {\n            id\n            code\n            label\n            tags\n          }\n          tags\n          updatedAt\n          createdAt\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllTopicsBaseDocument,
  "\n        query AllUsersBase(\n          $pagination: CursorConnectionArgs!\n          $filters: AdminUsersFilter!\n        ) {\n          adminUsers {\n            allUsers(pagination: $pagination, filters: $filters) {\n              nodes {\n                id\n                name\n                email\n              }\n              ...Pagination\n            }\n          }\n        }\n      ":
    graphql.AllUsersBaseDocument,
  "\n  fragment ActionsInfo on Action {\n    id\n    verb {\n      name\n    }\n    timestamp\n    result\n    user {\n      id\n      name\n      email\n    }\n    content {\n      id\n      code\n      label\n      tags\n    }\n    topic {\n      id\n      code\n      label\n    }\n    kcs {\n      id\n      code\n      label\n    }\n    stepID\n    hintID\n    amount\n    detail\n    extra\n\n    createdAt\n  }\n":
    graphql.ActionsInfoFragmentDoc,
  "\n      query AllActions(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminActionsFilter\n      ) {\n        adminActions {\n          allActions(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...ActionsInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    ":
    graphql.AllActionsDocument,
  "\n  fragment ContentInfo on Content {\n    id\n    code\n    label\n    description\n    tags\n    binaryBase64\n    binaryFilename\n    json\n    url\n    project {\n      id\n      code\n      label\n    }\n    kcs {\n      id\n      code\n      label\n    }\n    topics {\n      id\n    }\n    updatedAt\n    createdAt\n  }\n":
    graphql.ContentInfoFragmentDoc,
  "\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateContentDocument,
  "\n      mutation UpdateContent($data: UpdateContent!) {\n        adminContent {\n          updateContent(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateContentDocument,
  "\n      query AllContent(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminContentFilter\n      ) {\n        adminContent {\n          allContent(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...ContentInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    ":
    graphql.AllContentDocument,
  "\n      mutation CreateDomain($data: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateDomainDocument,
  "\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n":
    graphql.DomainInfoFragmentDoc,
  "\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllDomainsDocument,
  "\n      mutation UpdateDomain($data: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateDomainDocument,
  "\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    tags\n    flags {\n      id\n      readProjectActions\n      readProjectModelStates\n    }\n    projects {\n      id\n      code\n      label\n    }\n    users {\n      id\n      email\n      name\n      role\n      active\n      lastOnline\n    }\n  }\n":
    graphql.GroupInfoFragmentDoc,
  "\n  query AllGroups($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allGroups(pagination: $pagination) {\n        nodes {\n          ...GroupInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllGroupsDocument,
  "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateGroupDocument,
  "\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.SetUserGroupsDocument,
  "\n      mutation UpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateGroupDocument,
  "\n  fragment KCInfo on KC {\n    id\n    code\n    label\n    domain {\n      id\n      code\n      label\n    }\n    updatedAt\n    createdAt\n  }\n":
    graphql.KcInfoFragmentDoc,
  "\n      mutation CreateKC($data: CreateKCInput!) {\n        adminDomain {\n          createKC(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateKcDocument,
  "\n      query AllKCs(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminKCsFilter\n      ) {\n        adminDomain {\n          allKCs(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...KCInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    ":
    graphql.AllKCsDocument,
  "\n      mutation UpdateKC($data: UpdateKCInput!) {\n        adminDomain {\n          updateKC(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateKcDocument,
  "\n  fragment ProjectInfo on Project {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    domains {\n      id\n      code\n      label\n    }\n  }\n":
    graphql.ProjectInfoFragmentDoc,
  "\n  query AllProjects($pagination: CursorConnectionArgs!) {\n    adminProjects {\n      allProjects(pagination: $pagination) {\n        nodes {\n          ...ProjectInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllProjectsDocument,
  "\n      mutation CreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateProjectDocument,
  "\n      mutation UpdateProject($data: UpdateProject!) {\n        adminProjects {\n          updateProject(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateProjectDocument,
  "\n      mutation CreateTopic($data: CreateTopic!) {\n        adminDomain {\n          createTopic(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateTopicDocument,
  "\n      mutation UpdateTopic($data: UpdateTopic!) {\n        adminDomain {\n          updateTopic(input: $data) {\n            id\n            code\n            label\n          }\n        }\n      }\n    ":
    graphql.UpdateTopicDocument,
  "\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    updatedAt\n    locked\n    tags\n    projects {\n      id\n      code\n      label\n    }\n  }\n":
    graphql.UserInfoFragmentDoc,
  "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AdminUsersDocument,
  "\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectsIds: [IntID!]!\n      ) {\n        adminUsers {\n          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {\n            ...UserInfo\n          }\n        }\n      }\n    ":
    graphql.UpsertUsersWithProjectsDocument,
  "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateUserDocument,
};

export function gql(
  source: "\n      query currentUser {\n        currentUser {\n          id\n          email\n          name\n          role\n          picture\n        }\n      }\n    "
): typeof documents["\n      query currentUser {\n        currentUser {\n          id\n          email\n          name\n          role\n          picture\n        }\n      }\n    "];
export function gql(
  source: "\n        query AllVerbNames($pagination: CursorConnectionArgs!) {\n          adminActions {\n            allActionsVerbs(pagination: $pagination) {\n              nodes {\n                id\n                name\n              }\n              ...Pagination\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllVerbNames($pagination: CursorConnectionArgs!) {\n          adminActions {\n            allActionsVerbs(pagination: $pagination) {\n              nodes {\n                id\n                name\n              }\n              ...Pagination\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n  query AllContentBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminContentFilter\n  ) {\n    adminContent {\n      allContent(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n          tags\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllContentBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminContentFilter\n  ) {\n    adminContent {\n      allContent(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n          tags\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  query AllDomainsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminDomainsFilter\n  ) {\n    adminDomain {\n      allDomains(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllDomainsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminDomainsFilter\n  ) {\n    adminDomain {\n      allDomains(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n        query AllGroupsBase($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allGroups(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllGroupsBase($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allGroups(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n  query AllKCsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminKCsFilter\n  ) {\n    adminDomain {\n      allKCs(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllKCsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminKCsFilter\n  ) {\n    adminDomain {\n      allKCs(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  fragment Pagination on Connection {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n"
): typeof documents["\n  fragment Pagination on Connection {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n"];
export function gql(
  source: "\n        query AllProjectsBase($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllProjectsBase($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n  query AllTopicsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminTopicsFilter\n  ) {\n    adminDomain {\n      allTopics(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n          sortIndex\n          parent {\n            id\n            code\n            label\n          }\n          project {\n            id\n            code\n            label\n          }\n          content {\n            id\n            code\n            label\n            tags\n          }\n          tags\n          updatedAt\n          createdAt\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllTopicsBase(\n    $pagination: CursorConnectionArgs!\n    $filters: AdminTopicsFilter\n  ) {\n    adminDomain {\n      allTopics(pagination: $pagination, filters: $filters) {\n        nodes {\n          id\n          code\n          label\n          sortIndex\n          parent {\n            id\n            code\n            label\n          }\n          project {\n            id\n            code\n            label\n          }\n          content {\n            id\n            code\n            label\n            tags\n          }\n          tags\n          updatedAt\n          createdAt\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n        query AllUsersBase(\n          $pagination: CursorConnectionArgs!\n          $filters: AdminUsersFilter!\n        ) {\n          adminUsers {\n            allUsers(pagination: $pagination, filters: $filters) {\n              nodes {\n                id\n                name\n                email\n              }\n              ...Pagination\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllUsersBase(\n          $pagination: CursorConnectionArgs!\n          $filters: AdminUsersFilter!\n        ) {\n          adminUsers {\n            allUsers(pagination: $pagination, filters: $filters) {\n              nodes {\n                id\n                name\n                email\n              }\n              ...Pagination\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n  fragment ActionsInfo on Action {\n    id\n    verb {\n      name\n    }\n    timestamp\n    result\n    user {\n      id\n      name\n      email\n    }\n    content {\n      id\n      code\n      label\n      tags\n    }\n    topic {\n      id\n      code\n      label\n    }\n    kcs {\n      id\n      code\n      label\n    }\n    stepID\n    hintID\n    amount\n    detail\n    extra\n\n    createdAt\n  }\n"
): typeof documents["\n  fragment ActionsInfo on Action {\n    id\n    verb {\n      name\n    }\n    timestamp\n    result\n    user {\n      id\n      name\n      email\n    }\n    content {\n      id\n      code\n      label\n      tags\n    }\n    topic {\n      id\n      code\n      label\n    }\n    kcs {\n      id\n      code\n      label\n    }\n    stepID\n    hintID\n    amount\n    detail\n    extra\n\n    createdAt\n  }\n"];
export function gql(
  source: "\n      query AllActions(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminActionsFilter\n      ) {\n        adminActions {\n          allActions(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...ActionsInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    "
): typeof documents["\n      query AllActions(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminActionsFilter\n      ) {\n        adminActions {\n          allActions(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...ActionsInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment ContentInfo on Content {\n    id\n    code\n    label\n    description\n    tags\n    binaryBase64\n    binaryFilename\n    json\n    url\n    project {\n      id\n      code\n      label\n    }\n    kcs {\n      id\n      code\n      label\n    }\n    topics {\n      id\n    }\n    updatedAt\n    createdAt\n  }\n"
): typeof documents["\n  fragment ContentInfo on Content {\n    id\n    code\n    label\n    description\n    tags\n    binaryBase64\n    binaryFilename\n    json\n    url\n    project {\n      id\n      code\n      label\n    }\n    kcs {\n      id\n      code\n      label\n    }\n    topics {\n      id\n    }\n    updatedAt\n    createdAt\n  }\n"];
export function gql(
  source: "\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateContent($data: CreateContent!) {\n        adminContent {\n          createContent(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateContent($data: UpdateContent!) {\n        adminContent {\n          updateContent(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateContent($data: UpdateContent!) {\n        adminContent {\n          updateContent(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query AllContent(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminContentFilter\n      ) {\n        adminContent {\n          allContent(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...ContentInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    "
): typeof documents["\n      query AllContent(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminContentFilter\n      ) {\n        adminContent {\n          allContent(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...ContentInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation CreateDomain($data: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateDomain($data: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n"
): typeof documents["\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n"];
export function gql(
  source: "\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation UpdateDomain($data: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateDomain($data: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    tags\n    flags {\n      id\n      readProjectActions\n      readProjectModelStates\n    }\n    projects {\n      id\n      code\n      label\n    }\n    users {\n      id\n      email\n      name\n      role\n      active\n      lastOnline\n    }\n  }\n"
): typeof documents["\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    tags\n    flags {\n      id\n      readProjectActions\n      readProjectModelStates\n    }\n    projects {\n      id\n      code\n      label\n    }\n    users {\n      id\n      email\n      name\n      role\n      active\n      lastOnline\n    }\n  }\n"];
export function gql(
  source: "\n  query AllGroups($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allGroups(pagination: $pagination) {\n        nodes {\n          ...GroupInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllGroups($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allGroups(pagination: $pagination) {\n        nodes {\n          ...GroupInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment KCInfo on KC {\n    id\n    code\n    label\n    domain {\n      id\n      code\n      label\n    }\n    updatedAt\n    createdAt\n  }\n"
): typeof documents["\n  fragment KCInfo on KC {\n    id\n    code\n    label\n    domain {\n      id\n      code\n      label\n    }\n    updatedAt\n    createdAt\n  }\n"];
export function gql(
  source: "\n      mutation CreateKC($data: CreateKCInput!) {\n        adminDomain {\n          createKC(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateKC($data: CreateKCInput!) {\n        adminDomain {\n          createKC(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      query AllKCs(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminKCsFilter\n      ) {\n        adminDomain {\n          allKCs(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...KCInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    "
): typeof documents["\n      query AllKCs(\n        $pagination: CursorConnectionArgs!\n        $filters: AdminKCsFilter\n      ) {\n        adminDomain {\n          allKCs(pagination: $pagination, filters: $filters) {\n            nodes {\n              ...KCInfo\n            }\n            ...Pagination\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateKC($data: UpdateKCInput!) {\n        adminDomain {\n          updateKC(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateKC($data: UpdateKCInput!) {\n        adminDomain {\n          updateKC(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment ProjectInfo on Project {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    domains {\n      id\n      code\n      label\n    }\n  }\n"
): typeof documents["\n  fragment ProjectInfo on Project {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    domains {\n      id\n      code\n      label\n    }\n  }\n"];
export function gql(
  source: "\n  query AllProjects($pagination: CursorConnectionArgs!) {\n    adminProjects {\n      allProjects(pagination: $pagination) {\n        nodes {\n          ...ProjectInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllProjects($pagination: CursorConnectionArgs!) {\n    adminProjects {\n      allProjects(pagination: $pagination) {\n        nodes {\n          ...ProjectInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation CreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateProject($data: UpdateProject!) {\n        adminProjects {\n          updateProject(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateProject($data: UpdateProject!) {\n        adminProjects {\n          updateProject(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation CreateTopic($data: CreateTopic!) {\n        adminDomain {\n          createTopic(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateTopic($data: CreateTopic!) {\n        adminDomain {\n          createTopic(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateTopic($data: UpdateTopic!) {\n        adminDomain {\n          updateTopic(input: $data) {\n            id\n            code\n            label\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateTopic($data: UpdateTopic!) {\n        adminDomain {\n          updateTopic(input: $data) {\n            id\n            code\n            label\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    updatedAt\n    locked\n    tags\n    projects {\n      id\n      code\n      label\n    }\n  }\n"
): typeof documents["\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    updatedAt\n    locked\n    tags\n    projects {\n      id\n      code\n      label\n    }\n  }\n"];
export function gql(
  source: "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectsIds: [IntID!]!\n      ) {\n        adminUsers {\n          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {\n            ...UserInfo\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectsIds: [IntID!]!\n      ) {\n        adminUsers {\n          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {\n            ...UserInfo\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];

export function gql(source: string): DocumentNode | string;
export function gql(source: string) {
  return (documents as any)[source] || source;
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

export * from "rq-gql";
export * from "./graphql";
