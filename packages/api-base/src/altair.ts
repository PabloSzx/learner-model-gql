import type { AltairOptions } from "@graphql-ez/plugin-altair";

export const AltairIDEOptions: AltairOptions = {
  instanceStorageNamespace: "learner-model-gql",
  initialPreRequestScript: `altair.helpers.setEnvironment("auth_token", new URL(window.location).searchParams.get("token"));`,
  initialQuery: `query currentUser {
    currentUser {
      id
      name
      email
    }
}
`,
  initialHeaders: {
    authorization: "{{auth_token}}",
  },
};
