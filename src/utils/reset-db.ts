import { MongoClient } from "mongo";

async function getJson(filePath: string) {
  try {
    return JSON.parse(await Deno.readTextFile(filePath));
  } catch (e) {
    console.log(filePath + ": " + e.message);
  }
}
export async function resetDB() {
  const client = new MongoClient();

  const dummyDB = await getJson("src/utils/reset-db.json");

  await client.connect(Deno.env.get("MONGO_URI") as string);

  const db = client.database("test");

  db.collection("todos");
  await db.collection("todos").deleteMany({});
  await db.collection("todos").insertMany(dummyDB);
  console.log("DB reset");
}

export async function resetDBWithPrompt() {
  console.log("%cResetting db, are you sure?", "color: red");
  const input = prompt("Y/n");

  if (input === "Y" || input === "y") {
    try {
      await resetDB();
      console.log("%cDone", "color: blue");
      Deno.exit(0);
    } catch (error) {
      console.log(error.message);
      Deno.exit(1);
    }
  } else {
    console.log("%cAborted", "color: green");
    Deno.exit(0);
  }
}
