//import { UniqueArgumentDefinitionNamesRule } from "graphql";
//import { actionExtras } from "common-api/src/schemas";
import { gql, registerModule, Schemas } from "../ez";
import { bkt } from "./models/bkt";

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
          { prisma, authorization }
        ) {
          await authorization.expectUser;
          const [domain, user, state] = await Promise.all([
            //kcs jerarquia
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
                    type: typeModel,
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
            prisma.modelState.findFirst({
              where: {
                userId: userID,
                type: typeModel,
                domainId: domainID,
              },
              orderBy: { createdAt: "desc" },
            }),
          ]);

          const D = domain.kcs.map((code) => code.code); // array of code of KCs
          const M = state; //last state of student
          const A = user.actions.filter(
            (action) =>
              action.verbName == "tryStep" &&
              (Schemas.actionExtras.parse(action.extra).attemps ?? 0) == 0 &&
              action.createdAt > (M?.createdAt ?? 0)
          );

          const BKT = bkt(D, M, A);

          await prisma.modelState.create({
            data: {
              json: BKT,
              stateType: {
                connectOrCreate: {
                  where: { name: typeModel },
                  create: { name: typeModel },
                },
              },
              stateCreator: {
                connectOrCreate: {
                  where: { name: "BKT v1" },
                  create: { name: "BKT v1" },
                },
              },
              user: { connect: { id: userID } },
              domain: { connect: { id: domainID } },
            },
            select: null,
          });
        },
      },
    },
  }
);
