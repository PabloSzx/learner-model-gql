# learner-model-gql

## Client-side only

To only use the client-side of this project please checkout the `client` branch.

[https://github.com/PabloSzx/learner-model-gql/tree/client](https://github.com/PabloSzx/learner-model-gql/tree/client)

## Install

This project uses [pnpm workspaces](https://pnpm.io/workspaces).

Install [pnpm](https://pnpm.io/) if not installed already:

```bash
npm i -g pnpm
```

Then execute

```bash
pnpm i
```

And it will install all the required dependencies

## Development

You can execute in the root repo folder:

```bash
pnpm dev
```

## Vercel Deployment

This project's client's side is recommended to be deployed with [Vercel](https://vercel.com/).

The Vercel deployment settings have to be as:

![Vercel Config](https://i.imgur.com/zdpOYyU.png)

The __INSTALL COMMAND__ is: 

```
npm i -g pnpm && pnpm i --shamefully-hoist --store=node_modules/.pnpm-store && pnpm -r prepare
```