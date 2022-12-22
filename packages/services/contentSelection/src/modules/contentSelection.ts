import { Content, gql, KC, registerModule } from "../ez";
import { selectionCriterion } from "./functions/selectionCriterion";
import { subtraction } from "./functions/subtraction";

export const contentSelectionModule = registerModule(
  // This defines the types
  gql`
    extend type Query {
      contentSelection: ContentSelectionQueries!
    }
    type ContentSelectionQueries {
      contentSelected(input: ContentSelectionInput!): AllReturn! #change allContent to contentSelected? return :[ContentsReturns]!
    }
    input ContentSelectionInput {
      projectId: IntID!
      topicId: [IntID!]!
      userId: IntID!
      domainId: IntID!
      discardLast: Int! = 10
      zpdRange: [Float!] = [0.4, 0.6]
    }

    type Content {
      id: IntID!
    }

    type ContentsReturn {
      P: Content!
      Msg: String!
      Preferred: Boolean!
      Order: IntID!
    }

    type TableReturn {
      contentCode: String
      sim: Float
      diff: Float
      probSuccessAvg: Float
      probSuccessMult: Float
    }

    type AllReturn {
      contentResult: [ContentsReturn!]!
      model: JSON!
      oldP: [String]
      newP: [String]
      PU: [String]
      pAVGsim: Float!
      pAVGdif: Float!
      table: [TableReturn!]!
      tableSim: [TableReturn!]!
      tableDifEasy: [TableReturn!]!
      tableDifHarder: [TableReturn!]!
    }
  `,
  {
    id: "ContentSelection",
    dirname: import.meta.url,
    resolvers: {
      Query: {
        contentSelection() {
          return {};
        },
      },

      ContentSelectionQueries: {
        async contentSelected(
          _root,
          {
            input: {
              projectId,
              topicId,
              userId,
              domainId,
              discardLast,
              zpdRange,
            },
          },
          { prisma }
        ) {
          const [P, M, U] = await Promise.all([
            //All content to topicId
            /*prisma.content.findMany({
              where: {
                topics: { some: { id: topicId } },
                projectId: projectId,
              },
              include: { kcs: true },
            }),*/
            prisma.content.findMany({
              where: {
                topics: {
                  some: {
                    id: {
                      in: topicId,
                    },
                  },
                },
                projectId: projectId,
              },
              include: { kcs: true },
            }),

            /*All content of student to resolve (por implementar)*/
            /*prisma.content.findMany({
              where: {
                topics: { some: { id: topicId } },
                projectId: projectId,
                id: { notIn: [1] },
              },
              include: { kcs: true },
            }),*/
            prisma.modelState.findFirst({
              where: {
                userId: userId,
                type: "BKT",
                domainId: domainId,
              },
              orderBy: {
                createdAt: "desc",
              },
            }),

            prisma.user.findUnique({
              where: { id: userId },
              rejectOnNotFound: true,
              include: {
                modelStates: {
                  include: {
                    stateType: true,
                  },
                  where: {
                    domainId: domainId,
                  },
                  take: 1,
                  orderBy: { createdAt: "desc" },
                },
                actions: {
                  include: { kcs: true },
                  where: { kcs: { some: { domainId: domainId } } },
                },
              },
            }),
          ]);

          let A = U.actions
            .filter(
              (action) =>
                action.verbName == "completeContent" &&
                topicId.includes(action.topicId ?? 0)
            )
            .map((x) => {
              return x.contentId;
            })
            .reverse()
            .filter(
              (value, index, self) => self.indexOf(value) == index
            ) /*unique values*/
            .slice(0, discardLast);

          let PU = A.map((a) => {
            return P.find((P) => P?.id == a);
          }).filter((x): x is Content & { kcs: KC[] } => {
            return !!x;
          });

          let newP = subtraction(P, PU);

          if (zpdRange && zpdRange[0] && zpdRange[1]) {
            const contentSelection = selectionCriterion(
              P,
              newP,
              PU,
              M,
              zpdRange[0],
              zpdRange[1]
            );

            return contentSelection; //, contentSelection.zpdSim;
          }

          return {
            contentResult: [],
            model: {},
            oldP: [],
            newP: [],
            PU: [],
            pAVGsim: 0.0,
            pAVGdif: 0.0,
            table: [],
            tableSim: [],
            tableDifEasy: [],
            tableDifHarder: [],
          };
        },
      },
    },
  }
);
