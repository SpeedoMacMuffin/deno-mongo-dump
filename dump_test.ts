import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import { dump } from "./dump.ts";
import { Config } from "./schemas/config.schema.ts";

Deno.test(async function runDeezDumps() {
  const testConf: Config = {
    dumpDir: "./test_dump",
    uri: "mongodb://localhost:27017",
    exclude: ["admin", "config", "local"],
    dbs: [
      {
        name: "test",
        collections: [
          {
            name: "test",
            exclude: false,
          },
        ],
      },
    ],
  };

  try {
    await dump(testConf);
  } catch (e) {
    assertEquals(e, null);
  }

  // Deno.removeSync("./test_dump", { recursive: true });
});
