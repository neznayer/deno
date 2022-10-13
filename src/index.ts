import { Application } from "oak";
import config from "./utils/config.ts";
import router from "./routers/todos.router.ts";
import { periodicallyResetDB } from "./utils/periodically-reset.ts";

const port: number = parseInt(Deno.env.get("PORT") ?? config.PORT ?? "8000");

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

periodicallyResetDB(60 * 1000 * 15);

console.log(`http://localhost:${port}/`);

await app.listen({ port });
