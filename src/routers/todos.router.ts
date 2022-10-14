import { Router } from "oak";
import { MongoClient, ObjectId } from "mongo";

const router = new Router();

const client = new MongoClient();

console.log(Deno.env.get("MONGO_URL"));
await client.connect(Deno.env.get("MONGO_URL") as string);

const db = client.database("test");

router.get(
  "/todos",
  async (ctx) => {
    const todosArr = await db.collection("todos").find({}).toArray();
    ctx.response.body = todosArr;
  },
);

router.get("/todos/:id", async (ctx) => {
  const todo = await db.collection("todos").find({
    _id: new ObjectId(ctx.params.id),
  });
  ctx.response.body = todo;
});

router.post("/todos", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const newTodoId = await db.collection("todos").insertOne(
    body,
  );
  const newTodo = await db.collection("todos").findOne({ _id: newTodoId });
  ctx.response.body = newTodo;
});

router.put("/todos/:id", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const editedId = await db.collection("todos").updateOne(
    { _id: new ObjectId(ctx.params.id) },
    { $set: body },
    { upsert: false },
  );
  const updated = await db.collection("todos").findOne({ _id: editedId });
  ctx.response.body = updated;
});

router.delete("/todos/:id", async (ctx) => {
  const toDelete = await db.collection("todos").findOne({
    _id: new ObjectId(ctx.params.id),
  });

  if (!toDelete) ctx.throw(404, "Id not found");

  const deleted = await db.collection("todos").deleteOne({
    _id: toDelete?._id,
  });

  if (!deleted) ctx.throw(500, "Something went wrong");

  const todos = await db.collection("todos").find({}).toArray();

  ctx.response.body = todos;
});

export default router;
