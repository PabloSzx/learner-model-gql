FROM quay.io/bitnami/node:16.13.1-prod

WORKDIR /home/learner-model-gql

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm@latest

RUN pnpm fetch

COPY tsconfig.json package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc schema.gql ./

COPY packages/api-base ./packages/api-base
COPY packages/common ./packages/common
COPY packages/common-api ./packages/common-api
COPY packages/db ./packages/db
COPY packages/gateway ./packages/gateway
COPY packages/testing ./packages/testing
COPY packages/services ./packages/services
COPY packages/mono ./packages/mono

ENV CI="true"

RUN pnpm i

RUN pnpm -r prepare

RUN pnpm generate

RUN pnpm tsc

EXPOSE 3002 3003 3004 3005 3006 3007 8080

ENV NODE_OPTIONS="--enable-source-maps"
ENV NODE_ENV="production"
