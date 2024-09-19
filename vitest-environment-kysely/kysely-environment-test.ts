import type { Environment } from "vitest/environments";

export default <Environment>{
  name: "kysely",
  transformMode: "ssr",
  async setup() {
    console.log("Setup");

    return {
      async teardown() {
        console.log("Teardown");
      },
    };
  },
};
