import { registerModule, gql } from "../ez";

registerModule(
  gql`
    type Project {
      id: IntID!
    }
    extend type Group {
      projects: [Project!]!
    }
  `,
  {
    resolvers: {
      Group: {
        async projects({ id }, _args, { prisma }) {
          return (
            (await prisma.group
              .findUnique({
                where: {
                  id,
                },
              })
              .projects()) || []
          );
        },
      },
    },
  }
);
