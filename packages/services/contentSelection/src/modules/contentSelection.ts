import { gql, registerModule } from "../ez";
//import { difficulty } from "./functions/difficulty";
//import { similarity } from "./functions/similarity";
//import { subtraction } from "./functions/subtraction";

export const contentSelectionModule = registerModule(
  // This defines the types
  gql`
    extend type Query {
      contentSelection: ContentSelectionQueries!
    }
    type ContentSelectionQueries {
      allContent(input: ContentSelectionInput!): [Content!]!
    }
    input ContentSelectionInput {
      projectId: IntID!
      topicId: IntID!
      userId: IntID!
    }
    type Content {
      id: IntID!
    }
  `,
  {
    id: "ContentSelection",
    dirname: import.meta.url,
    resolvers: {
      ContentSelectionQueries: {
        async allContent(
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

          return PU;
          //console.log(P);
          //console.log(PU);
          //console.log(M);
          //quitar el ultimo problema hecho porsiacaso
          /* vistas últimamente por implementar */

          //const difficultyLevel = difficulty(P, M);
          //const lastExerciseDone = PU[0]?.kcs; //lastExerciseDone será el último timestamps
          //const similitud = similarity(P, M, lastExerciseDone); //PU[0] último ejercicio realizado

          /*por implementar
           * tabla
           * devolver Json con ejercicios más el mensaje
           */
        },
      },
    },
  }
);
