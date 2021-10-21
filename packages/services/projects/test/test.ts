import {
  assert,
  CreateDomain,
  CreateEmptyContent,
  CreateGroup,
  CreateProject,
  CreateTopic,
  CreateUser,
  expectDeepEqual,
  generate,
  gql,
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

  const resultProject = await mutation(
    gql(/* GraphQL */ `
      mutation AdminCreateProject($data: CreateProject!) {
        adminProjects {
          createProject(data: $data) {
            id
            code
            label
          }
        }
      }
    `),
    {
      variables: {
        data: {
          code: projectCode,
          label: projectLabel,
        },
      },
    }
  );

  expectDeepEqual(resultProject.errors, undefined);
  assert(resultProject.data);

  const project = resultProject.data.adminProjects.createProject;

  const projectId = project.id;

  expectDeepEqual(project, {
    code: projectCode,
    label: projectLabel,
    id: project.id,
  });

  const projectsList = await query(
    gql(/* GraphQL */ `
      query AdminAllProjects($pagination: CursorConnectionArgs!) {
        adminProjects {
          allProjects(pagination: $pagination) {
            nodes {
              id
              code
              label
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `),
    {
      variables: {
        pagination: {
          first: 10,
        },
      },
    }
  );

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
    const resultProject = await mutation(
      gql(/* GraphQL */ `
        mutation AdminUpdateProject($data: UpdateProject!) {
          adminProjects {
            updateProject(data: $data) {
              id
              code
              label
            }
          }
        }
      `),
      {
        variables: {
          data: {
            id: projectId,
            code: updatedCode,
            label: updatedLabel,
          },
        },
      }
    );

    expectDeepEqual(resultProject.errors, undefined);
    assert(resultProject.data);

    const project = resultProject.data.adminProjects.updateProject;

    expectDeepEqual(project.id, projectId);

    expectDeepEqual(project, {
      code: updatedCode,
      label: updatedLabel,
      id: project.id,
    });

    const projectsList = await query(
      gql(/* GraphQL */ `
        query AdminAllProjects($pagination: CursorConnectionArgs!) {
          adminProjects {
            allProjects(pagination: $pagination) {
              nodes {
                id
                code
                label
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      `),
      {
        variables: {
          pagination: {
            first: 10,
          },
        },
      }
    );

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
      const { contentId } = await CreateEmptyContent({
        project,
      });

      return {
        contentId,
      };
    }
  );

  const result = await query(
    gql(/* GraphQL */ `
      query AdminProjectFromContent($ids: [IntID!]!) {
        content(ids: $ids) {
          id
          project {
            id
            code
            label
          }
        }
      }
    `),
    {
      variables: {
        ids: [contentId],
      },
    }
  );

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

  const [, { domainId }, { topicId }] = await PromiseAllCallbacks(
    async () => {
      const { authUser } = await CreateUser({
        project,
        role: "USER",
      });

      MockAuthUser.user = authUser;
    },
    async () => {
      const { domain, domainId } = await CreateDomain({ project });

      return {
        domain,
        domainId,
      };
    },
    async () => {
      const topic = await CreateTopic({
        project,
      });

      const topicId = topic.id.toString();

      return {
        topic,
        topicId,
      };
    }
  );

  {
    const result = await query(
      gql(/* GraphQL */ `
        query AdminProjectFromDomain($ids: [IntID!]!) {
          domains(ids: $ids) {
            id
            projects {
              id
              code
              label
            }
          }
        }
      `),
      {
        variables: {
          ids: [domainId],
        },
      }
    );

    expectDeepEqual(result, {
      data: {
        domains: [
          {
            id: domainId,
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
  }

  {
    const result = await query(
      gql(/* GraphQL */ `
        query AdminProjectFromTopic($ids: [IntID!]!) {
          topics(ids: $ids) {
            id
            project {
              id
              code
              label
            }
          }
        }
      `),
      {
        variables: {
          ids: [topicId],
        },
      }
    );

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
      const result = await query(
        gql(/* GraphQL */ `
          query AdminProjectFromUser($ids: [IntID!]!) {
            users(ids: $ids) {
              id
              projects {
                id
                code
                label
              }
            }
          }
        `),
        {
          variables: {
            ids: [userId],
          },
        }
      );

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

      const result = await query(
        gql(/* GraphQL */ `
          query AdminProjectFromGroup($ids: [IntID!]!) {
            groups(ids: $ids) {
              id
              projects {
                id
              }
            }
          }
        `),
        {
          variables: {
            ids: [groupId],
          },
        }
      );

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
