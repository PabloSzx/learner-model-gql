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
      contentSelected(input: ContentSelectionInput!): [ContentsReturn!]! #change allContent to contentSelected? return :[ContentsReturns]!
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
                topicId.includes(action.topicId ?? 0) //(in)
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

          console.log("PU new");
          console.log(PU); //first undefined because dc1 not in P

          let Problems = subtraction(P, PU);
          //console.log("***array P-PU***");
          //console.log(Problems);

          if (zpdRange && zpdRange[0] && zpdRange[1]) {
            const contentSelection = selectionCriterion(
              Problems,
              PU,
              M,
              zpdRange[0],
              zpdRange[1]
            );

            return contentSelection;
          }

          return [];
        },
      },
    },
  }
);
