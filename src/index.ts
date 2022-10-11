import { serve } from "serve";
import { config } from "https://deno.land/x/dotenv/mod.ts";
await config({ export: true });

let port = parseInt(Deno.env.get("PORT") ?? "8000");

console.log(Deno.env.get("PORT"));
const s = serve({ port });

console.log(`http://localhost:${port}/`);

for await (const req of s) {
  req.respond({ body: "Choo Choo! Welcome to your Deno app\n" });
}
