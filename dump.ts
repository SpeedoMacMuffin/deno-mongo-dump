import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { exists } from "https://deno.land/std@0.183.0/fs/mod.ts";
import { Config } from "./schemas/config.schema.ts";

export const dump = async (config: Config) => {
  const { uri, dumpDir, exclude } = config;

  console.log(uri);
  console.log("Connecting to MongoDB...");
  const client = new MongoClient();

  await client.connect(uri);

  const dbs = await client.listDatabases();
  const dbNames = dbs.map((db) => db.name).filter((db) =>
    !exclude.includes(db)
  );
  console.log(dbNames);

  for (let i = 0; i < dbNames.length; i++) {
    const db = client.database(dbNames[i]);
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    console.log({ db: dbNames[i], collections: collectionNames });

    for (let j = 0; j < collectionNames.length; j++) {
      const collection = db.collection(collectionNames[j]);
      const documents = await collection.find().toArray();
      console.log(
        `Found ${documents.length} documents in ${dbNames[i]}.${
          collectionNames[j]
        }`,
      );
      console.log(
        `Dumping ${documents.length} documents from ${dbNames[i]}.${
          collectionNames[j]
        }`,
      );
      const json = JSON.stringify(documents);
      const fExists: boolean = await exists(`${dumpDir}`);
      if (!fExists) {
        Deno.mkdirSync(`${config.dumpDir}`);
      }
      await Deno.writeTextFile(
        `./${dumpDir}/${dbNames[i]}.${collectionNames[j]}.json`,
        json,
      );
      console.log(
        `Dumped ${documents.length} documents from ${dbNames[i]}.${
          collectionNames[j]
        }`,
      );
    }
  }
  client.close();
};
