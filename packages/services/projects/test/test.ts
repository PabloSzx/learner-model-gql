import {
  AdminAllProjectsDocument,
  AdminCreateProjectDocument,
  AdminProjectFromContentDocument,
  AdminProjectFromDomainDocument,
  AdminProjectFromTopicDocument,
  AdminUpdateProjectDocument,
  assert,
  CreateDomain,
  CreateEmptyContent,
  CreateProject,
  CreateUser,
  expectDeepEqual,
  generate,
  MockAuthUser,
  prisma,
  PromiseAllCallbacks,
  TestClient,
} from "testing";

export async function CheckProjectCreationRetrieval({
  mutation,
  query,
}: Pick<TestClient, "query" | "mutation">) {
  await prisma.$queryRaw`TRUNCATE "Project","User" CASCADE;`;

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

export async function CheckProjectFromContent({
  query,
}: Pick<TestClient, "query">) {
  const { project, projectId } = await CreateProject();

  const [, { contentId }] = await PromiseAllCallbacks(
    async () => {
      const { authUser } = await CreateUser({
        project,
        role: "USER",
      });

      MockAuthUser.user = authUser;
    },
    async () => {
      const { domain } = await CreateDomain({ project });
      const { contentId } = await CreateEmptyContent({
        project,
        domain,
      });

      return {
        contentId,
      };
    }
  );

  const result = await query(AdminProjectFromContentDocument, {
    variables: {
      ids: [contentId],
    },
  });

  expectDeepEqual(result, {
    data: {
      content: [
        {
          id: contentId,
          project: {
            id: projectId,
            code: project.code,
            label: project.label,
          },
        },
      ],
    },
  });
}

export async function CheckProjectFromDomainAndTopic({
  query,
}: Pick<TestClient, "query">) {
  const { project, projectId } = await CreateProject();

  const [, { topicId, domainId }] = await PromiseAllCallbacks(
    async () => {
      const { authUser } = await CreateUser({
        project,
        role: "USER",
      });

      MockAuthUser.user = authUser;
    },
    async () => {
      const { domain, domainId } = await CreateDomain({ project });

      const topicId = domain.topics[0]?.id.toString();

      assert(topicId);

      return {
        domain,
        domainId,
        topicId,
      };
    }
  );

  {
    const result = await query(AdminProjectFromDomainDocument, {
      variables: {
        ids: [domainId],
      },
    });

    expectDeepEqual(result, {
      data: {
        domains: [
          {
            id: domainId,
            project: {
              id: projectId,
              code: project.code,
              label: project.label,
            },
          },
        ],
      },
    });
  }

  {
    const result = await query(AdminProjectFromTopicDocument, {
      variables: {
        ids: [topicId],
      },
    });

    expectDeepEqual(result, {
      data: {
        topics: [
          {
            id: topicId,
            project: {
              id: projectId,
              code: project.code,
              label: project.label,
            },
          },
        ],
      },
    });
  }
}
