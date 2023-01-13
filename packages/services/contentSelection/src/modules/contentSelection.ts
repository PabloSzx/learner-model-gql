import { Content, gql, KC, registerModule } from "../ez";
import { selectionCriterion } from "./functions/selectionCriterion";
import { subtraction } from "./functions/subtraction";
import messages from "./functions/messages.json";
export const contentSelectionModule = registerModule(
  gql`
    extend type Query {
      "ContentSelection Query"
      contentSelection: ContentSelectionQueries!
    }

    "ContentSelection Queries"
    type ContentSelectionQueries {
      """
      Get all contentSelected properties associated with the specified ContentSelectionInput
      """
      contentSelected(
        input: ContentSelectionInput!
      ): ContentSelectedPropsReturn!
    }

    "ContentSelection input data"
    input ContentSelectionInput {
      "Project identifier"
      projectId: IntID!
      "Topic identifier"
      topicId: [IntID!]!
      "User identifier"
      userId: IntID!
      "Domain identifier"
      domainId: IntID!
      "Discard last N contents done (optional in query), default N= 10"
      discardLast: Int! = 10
      "Range Zone proximal development(ZPD) (optional in query), default [0.4,0.6]"
      zpdRange: [Float!] = [0.4, 0.6]
    }
    "Content entity"
    type Content {
      "Unique numeric identifier"
      id: IntID!
    }

    "Structure of message return in content selected"
    type Message {
      "Label of message of content selected"
      label: String!
      "Text of message of content selected"
      text: String!
    }

    "Main structure of content selected return"
    type ContentsSelectedReturn {
      "Content P"
      P: Content!
      "Message associated to Content"
      Msg: Message!
      "Preferred is true when Content is the best option for learner, else false"
      Preferred: Boolean!
      "Order is 1 when Content is selected for easy criterion, 2 when Content is selected for similar criterion and 3 when Content is selected for hard criterion"
      Order: IntID!
    }

    "Structure of TableReturn for check result of criterion and further analysis"
    type TableReturn {
      "Code of content"
      contentCode: String
      "Value of similarity of content"
      sim: Float
      "Value of difficulty of content"
      diff: Float
      "Probability of success by average of KCs levels of the Content"
      probSuccessAvg: Float
      "Probability of success by multiplication of KCs levels of the Content"
      probSuccessMult: Float
    }

    "Return selected content and properties for further analysis (model, codes of content, probabilities and tables)"
    type ContentSelectedPropsReturn {
      "Content selected for learner"
      contentResult: [ContentsSelectedReturn!]!
      "Return message of service"
      topicCompletedMsg: Message!
      "Model structure of learner composed for KC level and KC threshold"
      model: JSON!
      "All codes of contents of topic chapters"
      oldP: [String!]!
      "All codes of contents without last N contents and content dominated"
      newP: [String!]!
      "All code of contents of last N contents done"
      PU: [String!]!
      "Probability of success by average PK of exercise most similar"
      pAVGsim: Float!
      "Probability of success by average PK of exercise most difficult"
      pAVGdif: Float!
      "table of newP with TableReturn attributes"
      table: [TableReturn!]!
      "table filter with similarity equals to 1"
      tableSim: [TableReturn!]!
      "table filter with similarity less than 1 and difficulty less than difficulty of last content done (PU[0])"
      tableDifEasy: [TableReturn!]!
      "table filter with similarity less than 1 and difficulty greater than difficulty of last content done (PU[0])"
      tableDifHarder: [TableReturn!]!
    }
  `,
  {
    id: "ContentSelection",
    dirname: import.meta.url,
    resolvers: {
      Query: {
        contentSelection() {
          return {};
        },
      },

      ContentSelectionQueries: {
        async contentSelected(
          _root,
          {
            input: {
              projectId,
              topicId,
              userId,
              domainId,
              discardLast,
              zpdRange,
            },
          },
          { prisma }
        ) {
          const [P, M, U] = await Promise.all([
            prisma.content.findMany({
              where: {
                topics: {
                  some: {
                    id: {
                      in: topicId,
                    },
                  },
                },
                projectId: projectId,
              },
              include: { kcs: true },
            }),

            prisma.modelState.findFirst({
              where: {
                userId: userId,
                type: "BKT",
                domainId: domainId,
              },
              orderBy: {
                createdAt: "desc",
              },
            }),

            prisma.user.findUnique({
              where: { id: userId },
              rejectOnNotFound: true,
              include: {
                modelStates: {
                  include: {
                    stateType: true,
                  },
                  where: {
                    domainId: domainId,
                  },
                  take: 1,
                  orderBy: { createdAt: "desc" },
                },
                actions: {
                  include: { kcs: true },
                  where: { kcs: { some: { domainId: domainId } } },
                },
              },
            }),
          ]);

          let A = U.actions
            .filter(
              (action) =>
                action.verbName == "completeContent" &&
                topicId.includes(action.topicId ?? 0)
            )
            .sort(function (x, y) {
              //sometimes array is desorder
              return y.createdAt.valueOf() - x.createdAt.valueOf();
            })
            .map((x) => {
              return x.contentId;
            })
            .filter(
              //preguntar si se mantiene !!!!!
              (value, index, self) => self.indexOf(value) == index
            ) /*unique values*/
            .slice(0, discardLast);

          let PU = A.map((a) => {
            return P.find((P) => P?.id == a);
          }).filter((x): x is Content & { kcs: KC[] } => {
            return !!x;
          });

          let newP = subtraction(P, PU);

          if (zpdRange && zpdRange[0] && zpdRange[1] && P.length > 0) {
            const contentSelection = selectionCriterion(
              P,
              newP,
              PU,
              M,
              zpdRange[0],
              zpdRange[1]
            );

            return contentSelection; //, contentSelection.zpdSim;
          }

          return {
            contentResult: [],
            topicCompletedMsg: {
              label: messages.messageTopicCompleted.label,
              text: messages.messageTopicCompleted.text,
            },
            model: {},
            oldP: [],
            newP: [],
            PU: [],
            pAVGsim: 0.0,
            pAVGdif: 0.0,
            table: [],
            tableSim: [],
            tableDifEasy: [],
            tableDifHarder: [],
          };
        },
      },
    },
  }
);
