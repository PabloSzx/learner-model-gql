import {
  AdminAllProjectsDocument,
  AdminCreateProjectDocument,
  AdminProjectFromContentDocument,
  AdminProjectFromDomainDocument,
  AdminProjectFromTopicDocument,
  AdminProjectFromUserDocument,
  AdminUpdateProjectDocument,
  assert,
  CreateDomain,
  CreateEmptyContent,
  CreateGroup,
  CreateProject,
  CreateUser,
  expectDeepEqual,
  generate,
  MockAuthUser,
  prisma,
  PromiseAllCallbacks,
  TestClient,
  AdminProjectFromGroupDocument,
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

export async function CheckProjectFromUser({
  query,
}: Pick<TestClient, "query">) {
  const { project, projectId } = await CreateProject();

  const { authUser, userId } = await CreateUser({
    project,
    role: "USER",
  });

  MockAuthUser.user = authUser;

  await PromiseAllCallbacks(
    async () => {
      const result = await query(AdminProjectFromUserDocument, {
        variables: {
          ids: [userId],
        },
      });

      expectDeepEqual(result, {
        data: {
          users: [
            {
              id: userId,
              projects: [
                {
                  id: projectId,
                  code: project.code,
                  label: project.label,
                },
              ],
            },
          ],
        },
      });
    },
    async () => {
      const { groupId } = await CreateGroup({
        project,
      });

      const result = await query(AdminProjectFromGroupDocument, {
        variables: {
          ids: [groupId],
        },
      });

      expectDeepEqual(result, {
        data: {
          groups: [
            {
              id: groupId,
              projects: [
                {
                  id: projectId,
                },
              ],
            },
          ],
        },
      });
    }
  );
}
