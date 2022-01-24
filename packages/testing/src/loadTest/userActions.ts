import faker from "@faker-js/faker";
import { EZClient } from "@graphql-ez/client";
import assert from "assert/strict";
import { random, sample, sampleSize, uniqBy } from "lodash-es";
import { generate } from "randomstring";
import { gql } from "../generated";

export type CreateUserActionsParams = {
  verbNames: string[];
  email: string;
  uid: string;
  projects: number[];
};

export type UserActionsResult = Awaited<ReturnType<typeof createUserActions>>;

export default async function createUserActions({
  verbNames,
  projects,
  email,
  uid,
}: CreateUserActionsParams) {
  const chosenProject = sample(projects);

  assert(chosenProject);

  const { assertedQuery } = EZClient({
    endpoint: "http://localhost:8080/graphql",
    headers: {
      "auth-uid": uid,
      "auth-email": email,
    },
  });

  const userInfoStart = performance.now();

  const { currentUser, project } = await assertedQuery(
    gql(/* GraphQL */ `
      query LoadTestCurrentUser($projectId: IntID!) {
        currentUser {
          id
          email
        }
        project(id: $projectId) {
          id
          code
          label
          topics {
            id
            code
            label
          }
          content(pagination: { first: 50 }) {
            nodes {
              id
              code
              label
              tags
              kcs {
                id
                code
                label
              }
            }
          }
        }
      }
    `),
    {
      variables: {
        projectId: chosenProject.toString(),
      },
    }
  );

  const userInfoEnd = performance.now();

  assert(currentUser);
  assert(project);

  const projectId = project.id.toString();

  const topics = project.topics;
  const content = project.content.nodes;
  const kcs = uniqBy(
    project.content.nodes.flatMap((v) => v.kcs),
    (v) => v.id
  );

  async function MeasuredAction() {
    const start = performance.now();
    await assertedQuery(
      gql(/* GraphQL */ `
        mutation LoadTestAction($data: ActionInput!) {
          action(data: $data)
        }
      `),
      {
        variables: {
          data: {
            projectId,
            timestamp: Date.now(),
            verbName: sample(verbNames)!,
            amount: probability(33) ? random(0, 100) : null,
            contentID: probability(20) ? sample(content)?.id : null,
            kcsIDs: sampleSize(kcs, random(0, 3)).map((v) => v.id),
            topicID: probability(20) ? sample(topics)?.id : null,
            detail: probability(50)
              ? generate({
                  charset: "alphabetic",
                })
              : null,
            extra: probability(40)
              ? JSON.parse(faker.datatype.json())
              : undefined,
            stepID: probability(20) ? random(0, 20).toString() : null,
            hintID: probability(20) ? random(0, 40).toString() : null,
            result: probability(15) ? random(0, 1, true) : null,
          },
        },
      }
    );

    const end = performance.now();

    return {
      duration: end - start,
    };
  }

  const start = performance.now();

  const results = await Promise.all(new Array(10).fill(0).map(MeasuredAction));
  const end = performance.now();

  const duration = end - start;

  return {
    results,
    duration,
    userInfoDuration: userInfoEnd - userInfoStart,
  };
}

function probability(n: number) {
  assert(n < 100, "Invalid N");
  return random(0, 100) < n;
}
