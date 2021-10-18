import { DATABASE_URL } from "common-api";
import type { Subscription } from "../../gateway/src/ez.generated";
import { CreatePubSub } from "pg-gql-pubsub";

type PubSubData = { [k in keyof Subscription]: Pick<Subscription, k> };

declare module "pg-gql-pubsub" {
  interface Channels extends PubSubData {
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
