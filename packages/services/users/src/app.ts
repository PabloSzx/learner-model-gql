import { buildApp } from "./ez";

export const ezApp = buildApp({
  async prepare() {
    await import("./modules/index");
  },
});
export * from "./ez";
