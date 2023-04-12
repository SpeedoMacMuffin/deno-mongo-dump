import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";
import { dump } from "./dump.ts";
import { Config, configSchema } from "./schemas/config.schema.ts";

type Arguments = {
  config: string;
};
const args: Arguments = yargs(Deno.args).alias("c", "config").argv;

if (!args.config) {
  console.log("Please specify a config file");
  Deno.exit(1);
}

const configJson: Config = JSON.parse(Deno.readTextFileSync(args.config));

console.log(JSON.stringify(configJson, null, 2));

try {
  dump(configSchema.parse(configJson));
} catch (e) {
  console.log(e);
  Deno.exit(1);
}
