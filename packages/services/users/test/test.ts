import {
  assert,
  CreateGroup,
  CreateProject,
  CreateUser,
  expectDeepEqual,
  generate,
  gql,
  MockAuthUser,
  notDeepEqual,
  prisma,
  PromiseAllCallbacks,
  TestClient,
} from "testing";

export const UserInfo = gql(/* GraphQL */ `
  fragment UserInfo on User {
    id
    email
    name
    locked
    active
    lastOnline
    role
    createdAt
    updatedAt
  }
`);

export const GroupInfo = gql(/* GraphQL */ `
  fragment GroupInfo on Group {
    id
    code
    label
    users {
      id
      email
    }
    projectsIds
  }
`);

export const UsersGroupsInfo = gql(/* GraphQL */ `
  fragment UserGroupsInfo on User {
    id
    email
    groups {
      ...GroupInfo
    }
  }
`);

export async function CheckUsers({
  query,
  mutation,
}: Pick<TestClient, "query" | "mutation">) {
  await prisma.$queryRaw`TRUNCATE "Project","User" CASCADE;`;

  const { project, projectId } = await CreateProject();
  const authUser = await CreateUser({
    project,
    role: "ADMIN",
  });

  MockAuthUser.user = authUser.authUser;

  const [resultAuthUser] = await PromiseAllCallbacks(
    async () => {
      const result = await query(
        gql(/* GraphQL */ `
          query UsersById($ids: [IntID!]!) {
            users(ids: $ids) {
              ...UserInfo
            }
          }
        `),
        {
          variables: {
            ids: [authUser.userId],
          },
        }
      );

      expectDeepEqual(result.errors, undefined);

      const resultUser = result.data?.users[0];
      assert(resultUser);

      assert(resultUser.lastOnline);

      expectDeepEqual(result, {
        data: {
          users: [
            {
              active: true,
              createdAt: resultUser.createdAt,
              updatedAt: resultUser.updatedAt,
              lastOnline: resultUser.lastOnline,
              email: authUser.user.email,
              id: authUser.userId,
              locked: false,
              role: "ADMIN",
              name: authUser.user.name,
            },
          ],
        },
      });

      return resultUser;
    },
    async () => {
      const result = await query(
        gql(/* GraphQL */ `
          query AdminAllUsers($pagination: CursorConnectionArgs!) {
            adminUsers {
              allUsers(pagination: $pagination) {
                nodes {
                  ...UserInfo
                }
                pageInfo {
                  hasNextPage
                }
              }
            }
          }
        `),
        {
          variables: {
            pagination: {
              first: 10,
            },
          },
        }
      );

      expectDeepEqual(result.errors, undefined);

      const resultUser = result.data?.adminUsers.allUsers.nodes[0];
      assert(resultUser);

      assert(resultUser.lastOnline);

      expectDeepEqual(result, {
        data: {
          adminUsers: {
            allUsers: {
              nodes: [
                {
                  active: true,
                  createdAt: resultUser.createdAt,
                  updatedAt: resultUser.updatedAt,
                  lastOnline: resultUser.lastOnline,
                  email: authUser.user.email,
                  id: authUser.userId,
                  locked: false,
                  role: "ADMIN",
                  name: null,
                },
              ],
              pageInfo: {
                hasNextPage: false,
              },
            },
          },
        },
      });
    }
  );

  const newEmail = generate() + "@gmail.com";

  const upsertedResult = await mutation(
    gql(/* GraphQL */ `
      mutation UpsertUsersWithProjects(
        $emails: [EmailAddress!]!
        $projectsIds: [IntID!]!
      ) {
        adminUsers {
          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {
            ...UserInfo
          }
        }
      }
    `),
    {
      variables: {
        emails: [newEmail],
        projectsIds: [projectId],
      },
    }
  );

  expectDeepEqual(upsertedResult.errors, undefined);

  const upsertedResultUser =
    upsertedResult.data?.adminUsers.upsertUsersWithProjects[0];

  assert(upsertedResultUser);

  expectDeepEqual(upsertedResult, {
    data: {
      adminUsers: {
        upsertUsersWithProjects: [
          {
            active: false,
            createdAt: upsertedResultUser.createdAt,
            email: newEmail,
            id: upsertedResultUser.id,
            locked: false,
            role: "USER",
            updatedAt: upsertedResultUser.updatedAt,
            lastOnline: null,
            name: null,
          },
        ],
      },
    },
  });

  const updatedResult = await mutation(
    gql(/* GraphQL */ `
      mutation UpsertUsersWithProjects(
        $emails: [EmailAddress!]!
        $projectsIds: [IntID!]!
      ) {
        adminUsers {
          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {
            ...UserInfo
          }
        }
      }
    `),
    {
      variables: {
        emails: [newEmail],
        projectsIds: [projectId],
      },
    }
  );

  expectDeepEqual(updatedResult.errors, undefined);

  const updatedResultUser =
    updatedResult.data?.adminUsers.upsertUsersWithProjects[0];

  assert(updatedResultUser);

  expectDeepEqual(updatedResult, {
    data: {
      adminUsers: {
        upsertUsersWithProjects: [
          {
            active: false,
            createdAt: upsertedResultUser.createdAt,
            email: newEmail,
            id: upsertedResultUser.id,
            locked: false,
            role: "USER",
            updatedAt: updatedResultUser.updatedAt,
            lastOnline: null,
            name: updatedResultUser.name,
          },
        ],
      },
    },
  });

  {
    const allUsers = await query(
      gql(/* GraphQL */ `
        query AdminAllUsers($pagination: CursorConnectionArgs!) {
          adminUsers {
            allUsers(pagination: $pagination) {
              nodes {
                ...UserInfo
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      `),
      {
        variables: {
          pagination: {
            first: 10,
          },
        },
      }
    );

    const authUserUpdatedDates = await prisma.user.findUniqueOrThrow({
      where: {
        id: authUser.user.id,
      },
      select: {
        lastOnline: true,
        updatedAt: true,
      },
    });

    const authUserLastOnline = authUserUpdatedDates.lastOnline?.toISOString();
    const authUserUpdatedAt = authUserUpdatedDates.updatedAt.toISOString();

    expectDeepEqual(allUsers, {
      data: {
        adminUsers: {
          allUsers: {
            nodes: [
              {
                ...resultAuthUser,
                lastOnline: authUserLastOnline,
                updatedAt: authUserUpdatedAt,
              },
              updatedResultUser,
            ],
            pageInfo: {
              hasNextPage: false,
            },
          },
        },
      },
    });
  }
  {
    const currentUserResult = await query(
      gql(/* GraphQL */ `
        query CurrentUser {
          currentUser {
            ...UserInfo
          }
        }
      `)
    );

    const authUserUpdatedDates = await prisma.user.findUniqueOrThrow({
      where: {
        id: authUser.user.id,
      },
      select: {
        lastOnline: true,
        updatedAt: true,
      },
    });

    const authUserLastOnline = authUserUpdatedDates.lastOnline?.toISOString();
    const authUserUpdatedAt = authUserUpdatedDates.updatedAt.toISOString();

    expectDeepEqual(currentUserResult, {
      data: {
        currentUser: {
          ...resultAuthUser,
          lastOnline: authUserLastOnline,
          updatedAt: authUserUpdatedAt,
        },
      },
    });
  }
}

export async function CheckGroups({
  query,
  mutation,
}: Pick<TestClient, "mutation" | "query">) {
  await prisma.$queryRaw`TRUNCATE "Project","User","Group" CASCADE;`;

  const { project, projectId } = await CreateProject();
  const { authUser, user, userId } = await CreateUser({
    project,
    role: "ADMIN",
  });

  MockAuthUser.user = authUser;

  const { group: firstGroup, groupId: firstGroupId } = await CreateGroup({
    project,
    user,
  });

  await PromiseAllCallbacks(
    async () => {
      const result = await query(
        gql(/* GraphQL */ `
          query AdminAllGroups($pagination: CursorConnectionArgs!) {
            adminUsers {
              allGroups(pagination: $pagination) {
                nodes {
                  ...GroupInfo
                }
                pageInfo {
                  hasNextPage
                }
              }
            }
          }
        `),
        {
          variables: {
            pagination: {
              first: 10,
            },
          },
        }
      );

      expectDeepEqual(result, {
        data: {
          adminUsers: {
            allGroups: {
              nodes: [
                {
                  id: firstGroupId,
                  code: firstGroup.code,
                  label: firstGroup.label,
                  projectsIds: [projectId],
                  users: [
                    {
                      id: user.id.toString(),
                      email: user.email,
                    },
                  ],
                },
              ],
              pageInfo: {
                hasNextPage: false,
              },
            },
          },
        },
      });
    },
    async () => {
      const result = await query(
        gql(/* GraphQL */ `
          query GetGroups($ids: [IntID!]!) {
            groups(ids: $ids) {
              ...GroupInfo
            }
          }
        `),
        {
          variables: {
            ids: [firstGroupId],
          },
        }
      );

      expectDeepEqual(result, {
        data: {
          groups: [
            {
              id: firstGroupId,
              code: firstGroup.code,
              label: firstGroup.label,
              projectsIds: [projectId],
              users: [
                {
                  id: userId,
                  email: user.email,
                },
              ],
            },
          ],
        },
      });
    },
    async () => {
      const result = await query(
        gql(/* GraphQL */ `
          query UsersGroups($ids: [IntID!]!) {
            users(ids: $ids) {
              ...UserGroupsInfo
            }
          }
        `),
        {
          variables: {
            ids: [userId],
          },
        }
      );

      expectDeepEqual(result, {
        data: {
          users: [
            {
              id: userId,
              email: user.email,
              groups: [
                {
                  id: firstGroupId,
                  code: firstGroup.code,
                  label: firstGroup.label,
                  projectsIds: [projectId],
                  users: [
                    {
                      id: userId,
                      email: user.email,
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
    }
  );

  const user2 = await CreateUser({});

  const setUserGroupResult = await mutation(
    gql(/* GraphQL */ `
      mutation SetUserGroups(
        $usersEmails: [EmailAddress!]!
        $groupIds: [IntID!]!
      ) {
        adminUsers {
          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {
            id
            code
            label
            projectsIds
            users {
              id
              email
            }
          }
        }
      }
    `),
    {
      variables: {
        usersEmails: [user2.user.email],
        groupIds: [firstGroupId],
      },
    }
  );

  expectDeepEqual(setUserGroupResult, {
    data: {
      adminUsers: {
        setUserGroups: [
          {
            id: firstGroupId,
            code: firstGroup.code,
            label: firstGroup.label,
            projectsIds: [projectId],
            users: [
              {
                id: user2.userId,
                email: user2.user.email,
              },
            ],
          },
        ],
      },
    },
  });

  const group2Code = generate();
  const group2Label = generate();

  const group2Result = await mutation(
    gql(/* GraphQL */ `
      mutation AdminCreateGroup($data: CreateGroupInput!) {
        adminUsers {
          createGroup(data: $data) {
            ...GroupInfo
          }
        }
      }
    `),
    {
      variables: {
        data: {
          code: group2Code,
          label: group2Label,
          projectIds: [projectId],
          tags: [],
        },
      },
    }
  );

  expectDeepEqual(group2Result.errors, undefined);

  const group2 = group2Result.data?.adminUsers.createGroup;

  assert(group2);

  expectDeepEqual(group2Result, {
    data: {
      adminUsers: {
        createGroup: {
          code: group2Code,
          label: group2Label,
          id: group2.id,
          projectsIds: [projectId],
          users: [],
        },
      },
    },
  });

  const updatedGroup2Code = generate();
  const updatedGroup2Label = generate();
  notDeepEqual(updatedGroup2Code, group2.code);
  notDeepEqual(updatedGroup2Label, group2.label);

  const updatedGroup2Result = await mutation(
    gql(/* GraphQL */ `
      mutation AdminUpdateGroup($data: UpdateGroupInput!) {
        adminUsers {
          updateGroup(data: $data) {
            ...GroupInfo
          }
        }
      }
    `),
    {
      variables: {
        data: {
          id: group2.id.toString(),
          code: updatedGroup2Code,
          label: updatedGroup2Label,
          projectIds: [],
          tags: [],
        },
      },
    }
  );

  expectDeepEqual(updatedGroup2Result, {
    data: {
      adminUsers: {
        updateGroup: {
          id: group2.id.toString(),
          code: updatedGroup2Code,
          label: updatedGroup2Label,
          projectsIds: [],
          users: [],
        },
      },
    },
  });

  const updatedUser2 = await mutation(
    gql(/* GraphQL */ `
      mutation SetUserProjects($projectIds: [IntID!]!, $userIds: [IntID!]!) {
        adminUsers {
          setProjectsToUsers(projectIds: $projectIds, userIds: $userIds) {
            id
            email
            projectsIds
          }
        }
      }
    `),
    {
      variables: {
        projectIds: [projectId],
        userIds: [user2.userId],
      },
    }
  );

  expectDeepEqual(updatedUser2, {
    data: {
      adminUsers: {
        setProjectsToUsers: [
          {
            email: user2.user.email,
            id: user2.userId,
            projectsIds: [projectId],
          },
        ],
      },
    },
  });
}
