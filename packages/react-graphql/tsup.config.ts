export const tsup: import("tsup").Options = {
  target: "node14",
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  silent: true,
};
