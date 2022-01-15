# Build Prisma

FROM node:16-alpine as prisma-build

WORKDIR /home/prisma-build

COPY packages/db .

RUN npm i -g pnpm

RUN pnpm config set ignore-scripts true

RUN pnpm i

RUN pnpm generate

# Learner Model GQL

FROM node:16-alpine

WORKDIR /home/learner-model-gql

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm@latest

RUN pnpm add -g bob-tsm esbuild

RUN pnpm config set ignore-scripts true

RUN pnpm fetch --prod

COPY tsconfig.json package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc schema.gql ./

COPY packages/api-base ./packages/api-base
COPY packages/common ./packages/common
COPY packages/common-api ./packages/common-api
COPY packages/gateway ./packages/gateway
COPY packages/services ./packages/services
COPY packages/mono ./packages/mono

COPY packages/db ./packages/db
COPY --from=prisma-build /home/prisma-build/src/generated/client /home/learner-model-gql/packages/db/src/generated/client

ENV CI="true"

RUN pnpm i --prod

EXPOSE 3002 3003 3004 3005 3006 3007 8080

ENV NODE_OPTIONS="--enable-source-maps"
ENV NODE_ENV="production"
