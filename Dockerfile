# Build Prisma

FROM --platform=linux/x86_64 node:16 as prisma-build

WORKDIR /home/prisma-build

RUN npm i --location=global pnpm@latest

COPY packages/db .

ENV CI="true"

RUN pnpm i

RUN pnpm generate

# Learner Model GQL

FROM --platform=linux/x86_64 node:16

RUN npm i --location=global pnpm

WORKDIR /home/learner-model-gql

COPY tsconfig.json package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc schema.gql prepare.mjs ./

COPY patches ./patches
COPY packages/api-base ./packages/api-base
COPY packages/common ./packages/common
COPY packages/common-api ./packages/common-api
COPY packages/gateway ./packages/gateway
COPY packages/services ./packages/services
COPY packages/mono ./packages/mono

COPY packages/db ./packages/db

ENV CI="true"

RUN pnpm i --prod

COPY --from=prisma-build /home/prisma-build/src/generated/client /home/learner-model-gql/packages/db/src/generated/client

EXPOSE 3002 3003 3004 3005 3006 3007 8080

ENV NODE_OPTIONS="--enable-source-maps"
ENV NODE_ENV="production"
