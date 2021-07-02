import { gql, registerModule } from "../app";

registerModule(
  gql`
    type Verb {
      id: ID!

      # TRY_STEP REQUEST_HINT CLICK_STEP_TAB
      # FINISH_CONTENT DRAG_RESPONSE SELECT_TEXT
      # LOAD_CONTENT
      name: String!
    }

    type Activity {
      contentID: ID

      domainID: ID

      stepID: ID

      hintID: ID

      amount: Float

      detail: String

      extra: JSONObject
    }

    type Action {
      id: ID!

      verb: Verb!

      activity: Activity!

      timestamp: Timestamp!

      result: Float
    }
    type Query {
      data: Action!
    }
  `,
  {
    resolvers: {
      Query: {},
    },
  }
);
