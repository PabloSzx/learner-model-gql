import { gql, registerModule } from "../ez";
//import { selectionCriterion } from "./functions/selectionCriterion";
//import { subtraction } from "./functions/subtraction";

export const contentSelectionModule = registerModule(
  // This defines the types
  gql`
    extend type Query {
      contentSelection: ContentSelectionQueries!
    }
    type ContentSelectionQueries {
      contentSelected(input: ContentSelectionInput!): [Content!]! #change allContent to contentSelected? return :[ContentsReturns]!
    }
    input ContentSelectionInput {
      projectId: IntID!
      topicId: IntID!
      userId: IntID!
    }
    type Content {
      id: IntID!
    }
    type ContentsReturn {
      P: Content!
      msg: String!
      Preferred: Boolean!
    }
  `,
  {
    id: "ContentSelection",
    dirname: import.meta.url,
    resolvers: {
      ContentSelectionQueries: {
        async contentSelected(
          _root,
          { input: { projectId, topicId, userId } },
          { prisma }
        ) {
          const [P, PU, M] = await Promise.all([
            //All content to topicId
            prisma.content.findMany({
              where: {
                topics: { some: { id: topicId } },
                projectId: projectId,
              },
              include: { kcs: true },
            }),
            /*All content of student to resolve (por implementar)*/
            prisma.content.findMany({
              where: {
                topics: { some: { id: topicId } },
                projectId: projectId,
                id: { notIn: [1] },
              },
              include: { kcs: true },
            }),
            prisma.modelState.findFirst({
              where: {
                userId: userId,
              },
            }),
          ]);

          /*console.log(P.map((p) => p.code));
          console.log(PU.map((p) => p.code));
          console.log(M?.json);*/

          //let Problems = subtraction(P,PU);
          //const contentSelection = selectionCriterion(Problems,PU,M);
          console.log(PU);
          console.log(M);

          return P;
        },
      },
    },
  }
);
