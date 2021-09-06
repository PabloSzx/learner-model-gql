import { DATABASE_URL } from "common-api";
import { CreatePubSub } from "pg-gql-pubsub";

declare module "pg-gql-pubsub" {
  interface Channels {
    updateGateway: string;
  }
}

export const pubSub = CreatePubSub({
  connectionString: DATABASE_URL,
});

if (typeof after !== "undefined") {
  after(() => {
    pubSub.close();
  });
}
