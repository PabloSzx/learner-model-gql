import {
  AdminAllProjectsDocument,
  AdminCreateProjectDocument,
  AdminUpdateProjectDocument,
  assert,
  CreateUser,
  expectDeepEqual,
  generate,
  MockAuthUser,
  prisma,
  TestClient,
} from "testing";

export async function CheckProjectCreationRetrieval({
  mutation,
  query,
}: Pick<TestClient, "query" | "mutation">) {
  await prisma.$queryRaw`TRUNCATE "Project" CASCADE;`;
  await prisma.$queryRaw`TRUNCATE "User" CASCADE;`;

  const { authUser } = await CreateUser({
    role: "ADMIN",
  });

  MockAuthUser.user = authUser;

  const projectCode = generate();
  const projectLabel = generate();

  const resultProject = await mutation(AdminCreateProjectDocument, {
    variables: {
      data: {
        code: projectCode,
        label: projectLabel,
      },
    },
  });

  expectDeepEqual(resultProject.errors, undefined);
  assert(resultProject.data);

  const project = resultProject.data.adminProjects.createProject;

  const projectId = project.id;

  expectDeepEqual(project, {
    code: projectCode,
    label: projectLabel,
    id: project.id,
  });

  const projectsList = await query(AdminAllProjectsDocument, {
    variables: {
      pagination: {
        first: 10,
      },
    },
  });

  expectDeepEqual(projectsList, {
    data: {
      adminProjects: {
        allProjects: {
          nodes: [project],
          pageInfo: {
            hasNextPage: false,
          },
        },
      },
    },
  });

  const updatedCode = generate();
  const updatedLabel = generate();

  assert(updatedCode !== projectCode);
  assert(updatedLabel !== projectLabel);

  {
    const resultProject = await mutation(AdminUpdateProjectDocument, {
      variables: {
        data: {
          id: projectId,
          code: updatedCode,
          label: updatedLabel,
        },
      },
    });

    expectDeepEqual(resultProject.errors, undefined);
    assert(resultProject.data);

    const project = resultProject.data.adminProjects.updateProject;

    expectDeepEqual(project.id, projectId);

    expectDeepEqual(project, {
      code: updatedCode,
      label: updatedLabel,
      id: project.id,
    });

    const projectsList = await query(AdminAllProjectsDocument, {
      variables: {
        pagination: {
          first: 10,
        },
      },
    });

    expectDeepEqual(projectsList, {
      data: {
        adminProjects: {
          allProjects: {
            nodes: [project],
            pageInfo: {
              hasNextPage: false,
            },
          },
        },
      },
    });
  }
}
