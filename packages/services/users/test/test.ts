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
