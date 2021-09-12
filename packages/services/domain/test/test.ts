import {
  AllDomainsDocument,
  AllTopicsDocument,
  assert,
  CreateDomain,
  CreateDomainDocument,
  CreateEmptyContent,
  CreateProject,
  CreateTopicDocument,
  CreateUser,
  DomainFromContentDocument,
  DomainsFromProjectsDocument,
  expectDeepEqual,
  generate,
  MockAuthUser,
  prisma,
  TestClient,
  UpdateDomainDocument,
  UpdateTopicDocument,
} from "testing";

export async function CheckDomainCreationRetrieval({
  mutation,
  query,
}: Pick<TestClient, "mutation" | "query">) {
  await prisma.$queryRaw`TRUNCATE "Domain","User" CASCADE;`;

  const { project, projectId } = await CreateProject();

  const { authUser, user } = await CreateUser({ project });

  MockAuthUser.user = authUser;

  const domainCode = generate();
  const domainLabel = generate();

  const domainResult = await mutation(CreateDomainDocument, {
    variables: {
      input: {
        code: domainCode,
        label: domainLabel,
        projectId,
      },
    },
  });

  expectDeepEqual(domainResult.errors, undefined);

  const domain = domainResult.data?.adminDomain.createDomain;

  assert(domain);

  expectDeepEqual(domain, {
    code: domainCode,
    label: domainLabel,
    id: domain.id,
  });

  expectDeepEqual(
    await query(AllDomainsDocument, {
      variables: {
        pagination: {
          first: 10,
        },
      },
    }),
    {
      data: {
        adminDomain: {
          allDomains: {
            nodes: [domain],
            pageInfo: {
              hasNextPage: false,
            },
          },
        },
      },
    }
  );

  const tempDomainLabel = generate();

  assert(tempDomainLabel !== domainLabel);

  const tempDomainResult = await mutation(UpdateDomainDocument, {
    variables: {
      input: {
        id: domain.id,
        label: tempDomainLabel,
      },
    },
  });

  expectDeepEqual(tempDomainResult.errors, undefined);

  const tempDomain = tempDomainResult.data?.adminDomain.updateDomain;

  assert(tempDomain);

  expectDeepEqual(tempDomain, {
    code: domainCode,
    id: domain.id,
    label: tempDomainLabel,
  });

  expectDeepEqual(
    await query(AllDomainsDocument, {
      variables: {
        pagination: {
          first: 10,
        },
      },
    }),
    {
      data: {
        adminDomain: {
          allDomains: {
            nodes: [tempDomain],
            pageInfo: {
              hasNextPage: false,
            },
          },
        },
      },
    }
  );

  const backResult = await mutation(UpdateDomainDocument, {
    variables: {
      input: {
        id: domain.id,
        label: domainLabel,
      },
    },
  });

  expectDeepEqual(backResult.errors, undefined);
  assert(backResult.data);

  expectDeepEqual(backResult.data.adminDomain.updateDomain, domain);

  const domainId = domain.id.toString();

  return {
    project,
    projectId,
    authUser,
    user,
    domain,
    domainId,
  };
}

export async function CheckTopicsCreationRetrieval({
  mutation,
  query,
}: Pick<TestClient, "mutation" | "query">) {
  const { projectId, domainId } = await CheckDomainCreationRetrieval({
    mutation,
    query,
  });

  const firstTopicCode = generate();
  const firstTopicLabel = generate();

  const firstTopicResult = await mutation(CreateTopicDocument, {
    variables: {
      input: {
        domainId,
        code: firstTopicCode,
        label: firstTopicLabel,
        projectId,
      },
    },
  });

  expectDeepEqual(firstTopicResult.errors, undefined);

  assert(firstTopicResult.data?.adminDomain.createTopic);

  const firstTopic = firstTopicResult.data.adminDomain.createTopic;

  expectDeepEqual(firstTopic, {
    code: firstTopicCode,
    label: firstTopicLabel,
    domain: {
      id: domainId,
    },
    id: firstTopic.id,
    parent: null,
    childrens: [],
  });

  const secondTopicCode = generate();
  const secondTopicLabel = generate();

  const secondTopicResult = await mutation(CreateTopicDocument, {
    variables: {
      input: {
        domainId,
        code: secondTopicCode,
        label: secondTopicLabel,
        projectId,
        parentTopicId: firstTopic.id,
      },
    },
  });

  expectDeepEqual(secondTopicResult.errors, undefined);

  assert(secondTopicResult.data?.adminDomain.createTopic);

  const secondTopic = secondTopicResult.data.adminDomain.createTopic;

  expectDeepEqual(secondTopic, {
    code: secondTopicCode,
    label: secondTopicLabel,
    domain: {
      id: domainId,
    },
    id: secondTopic.id,
    parent: {
      id: firstTopic.id,
      domain: {
        id: domainId,
      },
    },
    childrens: [],
  });

  const allTopicsResult = await query(AllTopicsDocument, {
    variables: {
      pagination: {
        first: 10,
      },
    },
  });

  expectDeepEqual(allTopicsResult.errors, undefined);

  const allTopics = allTopicsResult.data?.adminDomain.allTopics;

  assert(allTopics);

  expectDeepEqual(allTopics, {
    nodes: [
      {
        id: firstTopic.id,
        code: firstTopic.code,
        label: firstTopic.label,
        domain: { id: domainId },
        parent: null,
        childrens: [
          {
            id: secondTopic.id,
            domain: { id: domainId },
          },
        ],
      },
      {
        id: secondTopic.id,
        code: secondTopic.code,
        label: secondTopic.label,
        domain: { id: domainId },
        parent: {
          id: firstTopic.id,
          domain: { id: domainId },
        },
        childrens: [],
      },
    ],
    pageInfo: { hasNextPage: false },
  });

  {
    const firstTopicNewLabel = generate();
    const firstTopicNewCode = generate();
    const updatedFirstTopicResult = await mutation(UpdateTopicDocument, {
      variables: {
        input: {
          label: firstTopicNewLabel,
          code: firstTopicNewCode,
          id: firstTopic.id,
          domainId,
          projectId,
          parentTopicId: secondTopic.id,
        },
      },
    });

    expectDeepEqual(updatedFirstTopicResult.errors, undefined);

    const updatedFirstTopic =
      updatedFirstTopicResult.data?.adminDomain.updateTopic;

    assert(updatedFirstTopic);

    expectDeepEqual(updatedFirstTopic, {
      code: firstTopicNewCode,
      label: firstTopicNewLabel,
      domain: {
        id: domainId,
      },
      id: firstTopic.id,
      parent: {
        domain: {
          id: domainId,
        },
        id: secondTopic.id,
      },
      childrens: [
        {
          domain: {
            id: domainId,
          },
          id: secondTopic.id,
        },
      ],
    });

    const secondTopicNewLabel = generate();
    const secondTopicNewCode = generate();

    const updatedSecondTopicResult = await mutation(UpdateTopicDocument, {
      variables: {
        input: {
          label: secondTopicNewLabel,
          code: secondTopicNewCode,
          id: secondTopic.id,
          domainId,
          projectId,
          parentTopicId: null,
        },
      },
    });
    expectDeepEqual(updatedSecondTopicResult.errors, undefined);

    const updatedSecondTopic =
      updatedSecondTopicResult.data?.adminDomain.updateTopic;

    assert(updatedSecondTopic);

    expectDeepEqual(updatedSecondTopic, {
      code: secondTopicNewCode,
      label: secondTopicNewLabel,
      domain: {
        id: domainId,
      },
      id: secondTopic.id,
      parent: null,
      childrens: [
        {
          domain: {
            id: domainId,
          },
          id: firstTopic.id,
        },
      ],
    });

    const allTopicsResult = await query(AllTopicsDocument, {
      variables: {
        pagination: {
          first: 10,
        },
      },
    });

    expectDeepEqual(allTopicsResult.errors, undefined);

    const allTopics = allTopicsResult.data?.adminDomain.allTopics;

    assert(allTopics);

    expectDeepEqual(allTopics, {
      nodes: [
        {
          id: firstTopic.id,
          code: updatedFirstTopic.code,
          label: updatedFirstTopic.label,
          domain: { id: domainId },
          parent: {
            id: secondTopic.id,
            domain: { id: domainId },
          },
          childrens: [],
        },
        {
          id: secondTopic.id,
          code: updatedSecondTopic.code,
          label: updatedSecondTopic.label,
          domain: { id: domainId },
          parent: null,
          childrens: [
            {
              id: firstTopic.id,
              domain: { id: domainId },
            },
          ],
        },
      ],
      pageInfo: { hasNextPage: false },
    });
  }
}

export async function CheckDomainOfContent({
  query,
}: Pick<TestClient, "query">) {
  await prisma.$queryRaw`TRUNCATE "Domain","Content","User" CASCADE;`;

  const { project } = await CreateProject();

  const { authUser } = await CreateUser({ project });

  MockAuthUser.user = authUser;

  const { domain, domainId } = await CreateDomain({
    project,
  });

  const { contentId } = await CreateEmptyContent({
    project,
    domain,
  });

  const ContentDomainResult = await query(DomainFromContentDocument, {
    variables: {
      ids: [contentId],
    },
  });

  expectDeepEqual(ContentDomainResult, {
    data: {
      content: [
        {
          id: contentId,
          domain: {
            id: domainId,
          },
        },
      ],
    },
  });
}

export async function CheckDomainsOfProjects({
  query,
}: Pick<TestClient, "query">) {
  await prisma.$queryRaw`TRUNCATE "Domain","Project","User" CASCADE;`;

  const { project, projectId } = await CreateProject();

  const { authUser } = await CreateUser({ project });

  MockAuthUser.user = authUser;

  const { domainId } = await CreateDomain({
    project,
  });

  const ProjectDomainResult = await query(DomainsFromProjectsDocument, {
    variables: {
      ids: [projectId],
    },
  });

  expectDeepEqual(ProjectDomainResult, {
    data: {
      projects: [
        {
          id: projectId,
          domains: [
            {
              id: domainId,
            },
          ],
        },
      ],
    },
  });
}
