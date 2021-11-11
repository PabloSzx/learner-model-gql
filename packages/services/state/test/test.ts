import {
  GetTestClient,
  TestClient,
  gql,
  prisma,
  CreateDomain,
  CreateProject,
  CreateUser,
  MockAuthUser,
  expectDeepEqual,
} from "testing";
import { domainModule, stateModule, userModule } from "../src/modules";

export const StateTestClient = () =>
  GetTestClient({
    prepare({ registerModule }) {
      registerModule(stateModule);
      registerModule(domainModule);
      registerModule(userModule);
    },
  });

export const CheckServiceState = async ({ assertedQuery }: TestClient) => {
  const { project } = await CreateProject();
  const domain = await CreateDomain({
    project,
  });

  const user = await CreateUser({
    project,
  });

  MockAuthUser.user = user.authUser;

  const dbState = await prisma.modelState.create({
    data: {
      json: {
        hello: "world",
      },
      stateCreator: {
        connectOrCreate: {
          create: {
            name: "creator",
          },
          where: {
            name: "creator",
          },
        },
      },
      user: {
        connect: {
          id: user.user.id,
        },
      },
      domain: {
        connect: {
          id: domain.domain.id,
        },
      },
      stateType: {
        connectOrCreate: {
          create: {
            name: "type",
          },
          where: {
            name: "type",
          },
        },
      },
    },
  });

  const allStates = await assertedQuery(
    gql(/* GraphQL */ `
      query AllStatesTest {
        adminState {
          allModelStates(input: { pagination: { first: 10 } }) {
            pageInfo {
              hasNextPage
            }
            nodes {
              id
              json
              creator
              type
              user {
                id
              }
              domain {
                id
              }
            }
          }
        }
      }
    `)
  );

  expectDeepEqual(allStates, {
    adminState: {
      allModelStates: {
        pageInfo: {
          hasNextPage: false,
        },

        nodes: [
          {
            json: {
              hello: "world",
            },
            creator: "creator",
            type: "type",
            user: {
              id: user.userId,
            },
            domain: {
              id: domain.domainId,
            },
            id: dbState.id.toString(),
          },
        ],
      },
    },
  });
};
