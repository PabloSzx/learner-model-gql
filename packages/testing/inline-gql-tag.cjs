const { codegen } = require("@graphql-codegen/core");
const { preset } = require("@graphql-codegen/gql-tag-operations-preset");
const {
  getCachedDocumentNodeFromSchema,
} = require("@graphql-codegen/plugin-helpers");
const { CodeFileLoader } = require("@graphql-tools/code-file-loader");
const { loadDocuments } = require("@graphql-tools/load");
const { readFile, writeFile } = require("fs/promises");
const { buildSchema } = require("graphql");
const { resolve } = require("path");
const uniqBy = require("lodash/uniqBy");
const prettier = require("prettier");

const testingDir = resolve(__dirname, ".");

const rootDir = resolve(testingDir, "../../");

process.chdir(rootDir);

(async () => {
  const schema = buildSchema(
    await readFile("./schema.gql", { encoding: "utf-8" })
  );

  const loadedDocuments = uniqBy(
    await loadDocuments(["**/*.test.ts"], {
      loaders: [
        new CodeFileLoader({
          pluckConfig: {
            skipIndent: true,
          },
        }),
      ],
    }),
    (v) => v.rawSDL
  );

  const schemaAsDocumentNode = getCachedDocumentNodeFromSchema(schema);

  const optionsList = await preset.buildGeneratesSection({
    baseOutputDir: resolve(testingDir, "src/gql"),
    config: {
      useTypeImports: true,
    },
    documents: loadedDocuments,
    pluginMap: {},
    plugins: [],
    presetConfig: {},
    schema: schemaAsDocumentNode,
    pluginContext: {},
    schemaAst: schema,
  });

  const prettierConfig = await prettier.resolveConfig(".prettierrc");

  for (const options of optionsList) {
    const codegenCode = await codegen(options);

    let formattedCode = prettier.format(codegenCode, {
      ...prettierConfig,
      parser: "typescript",
    });

    if (options.filename.endsWith("index.ts")) {
      formattedCode = formattedCode.replace("import {", "import type {");
    }

    await writeFile(options.filename, formattedCode, {
      encoding: "utf-8",
    });
  }
})();
