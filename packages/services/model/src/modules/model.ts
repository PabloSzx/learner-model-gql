import { gql, registerModule } from "../ez";

export const modelModule = registerModule(
  gql`
    "Model State Entity"
    type ModelState {
      id: IntID!
    }
    "Different types of Model State"
    enum ModelStateAlgorithm {
      BKT
    }

    "Input to update model state"
    input UpdateModelStateInput {
      domainID: IntID!
      userID: IntID!
      typeModel: ModelStateAlgorithm!
    }

    extend type Mutation {
      "Update model state with new state"
      updateModelState(input: UpdateModelStateInput!): Void
    }
  `,
  {
    id: "Model",
    dirname: import.meta.url,
    resolvers: {
      Mutation: {
        async updateModelState(
          _root,
          { input: { domainID, userID, typeModel } },
          { prisma }
        ) {
          const [domain, user] = await Promise.all([
            prisma.domain.findUnique({
              where: { id: domainID },
              rejectOnNotFound: true,
              include: { kcs: true },
            }),
            prisma.user.findUnique({
              where: { id: userID },
              rejectOnNotFound: true,
              include: {
                modelStates: {
                  include: {
                    stateType: true,
                  },
                  where: {
                    domainId: domainID,
                  },
                  take: 1,
                  orderBy: { createdAt: "desc" },
                },
                actions: {
                  include: { kcs: true },
                  where: { kcs: { some: { domainId: domainID } } },
                },
              },
            }),
          ]);
          user.actions;
          //logica
          //insert/update state
        },
      },
    },
  }
);
