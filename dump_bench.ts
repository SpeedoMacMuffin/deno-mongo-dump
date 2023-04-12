import { dumpMeDb } from "./dump.ts";
import { Config } from "./schemas/config.schema.ts";

const testConf: Config = {
  dumpDir: "./bench_dump",
  uri: "mongodb://localhost:27017",
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

Deno.bench(function runDump() {
  dumpMeDb(testConf);
});
