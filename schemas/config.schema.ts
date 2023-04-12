import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const collectionConfigSchema = z.object({
  name: z.string(),
  exclude: z.boolean().optional().default(false),
});
const dbConfigSchema = z.object({
  name: z.string(),
  collections: z.array(collectionConfigSchema).min(1),
});

export const configSchema = z.object({
  dumpDir: z.string(),
  exclude: z.array(z.string()).optional().default(["admin", "config", "local"]),
  uri: z.string(),
  dbs: z.array(dbConfigSchema).min(1),
});

export type Config = z.infer<typeof configSchema>;
