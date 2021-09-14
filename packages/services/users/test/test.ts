import {
  AdminAllUsersDocument,
  assert,
  CreateProject,
  CreateUser,
  CurrentUserDocument,
  expectDeepEqual,
  generate,
  MockAuthUser,
  notEqual,
  prisma,
  PromiseAllCallbacks,
  TestClient,
  UpsertUsersDocument,
  UsersByIdDocument,
  CreateGroup,
  AdminAllGroupsDocument,
  GetGroupsDocument,
  UsersGroupsDocument,
  SetUserGroupsDocument,
  AdminCreateGroupDocument,
  notDeepEqual,
  AdminUpdateGroupDocument,
  SetUserProjectsDocument,
} from "testing";

export async function CheckUsers({
  query,
  mutation,
}: Pick<TestClient, "query" | "mutation">) {
  await prisma.$queryRaw`TRUNCATE "Project","User" CASCADE;`;

  const { project } = await CreateProject();
  const authUser = await CreateUser({
    project,
    role: "ADMIN",
  });

  MockAuthUser.user = authUser.authUser;

  const [resultAuthUser] = await PromiseAllCallbacks(
    async () => {
      const result = await query(UsersByIdDocument, {
        variables: {
          ids: [authUser.userId],
        },
      });

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
              enabled: true,
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
      const result = await query(AdminAllUsersDocument, {
        variables: {
          pagination: {
            first: 10,
          },
        },
      });

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
                  enabled: true,
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

  const upsertedResult = await mutation(UpsertUsersDocument, {
    variables: {
      data: [
        {
          email: newEmail,
        },
      ],
    },
  });

  expectDeepEqual(upsertedResult.errors, undefined);

  const upsertedResultUser = upsertedResult.data?.adminUsers.upsertUsers[0];

  assert(upsertedResultUser);

  expectDeepEqual(upsertedResult, {
    data: {
      adminUsers: {
        upsertUsers: [
          {
            active: false,
            createdAt: upsertedResultUser.createdAt,
            email: newEmail,
            enabled: true,
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

  const newName = generate();

  const updatedResult = await mutation(UpsertUsersDocument, {
    variables: {
      data: [
        {
          email: newEmail,
          name: newName,
        },
      ],
    },
  });

  expectDeepEqual(updatedResult.errors, undefined);

  const updatedResultUser = updatedResult.data?.adminUsers.upsertUsers[0];

  assert(updatedResultUser);

  notEqual(updatedResultUser.updatedAt, upsertedResultUser.updatedAt);

  expectDeepEqual(updatedResult, {
    data: {
      adminUsers: {
        upsertUsers: [
          {
            active: false,
            createdAt: upsertedResultUser.createdAt,
            email: newEmail,
            enabled: true,
            id: upsertedResultUser.id,
            locked: false,
            role: "USER",
            updatedAt: updatedResultUser.updatedAt,
            lastOnline: null,
            name: newName,
          },
        ],
      },
    },
  });

  {
    const allUsers = await query(AdminAllUsersDocument, {
      variables: {
        pagination: {
          first: 10,
        },
      },
    });

    const authUserUpdatedDates = await prisma.user.findUnique({
      where: {
        id: authUser.user.id,
      },
      rejectOnNotFound: true,
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
    const currentUserResult = await query(CurrentUserDocument);

    const authUserUpdatedDates = await prisma.user.findUnique({
      where: {
        id: authUser.user.id,
      },
      rejectOnNotFound: true,
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
      const result = await query(AdminAllGroupsDocument, {
        variables: {
          pagination: {
            first: 10,
          },
        },
      });

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
      const result = await query(GetGroupsDocument, {
        variables: {
          ids: [firstGroupId],
        },
      });

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
      const result = await query(UsersGroupsDocument, {
        variables: {
          ids: [userId],
        },
      });

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

  const setUserGroupResult = await mutation(SetUserGroupsDocument, {
    variables: {
      userIds: [user2.userId],
      groupIds: [firstGroupId],
    },
  });

  expectDeepEqual(setUserGroupResult, {
    data: {
      adminUsers: {
        setUserGroups: [
          {
            email: user2.user.email,
            id: user2.userId,
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
                  {
                    id: user2.userId,
                    email: user2.user.email,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  });

  const group2Code = generate();
  const group2Label = generate();

  const group2Result = await mutation(AdminCreateGroupDocument, {
    variables: {
      data: {
        code: group2Code,
        label: group2Label,
        projectIds: [projectId],
      },
    },
  });

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

  const updatedGroup2Result = await mutation(AdminUpdateGroupDocument, {
    variables: {
      data: {
        id: group2.id.toString(),
        code: updatedGroup2Code,
        label: updatedGroup2Label,
        projectIds: [],
      },
    },
  });

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

  const updatedUser2 = await mutation(SetUserProjectsDocument, {
    variables: {
      projectIds: [projectId],
      userIds: [user2.userId],
    },
  });

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
