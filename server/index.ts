import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { saveThingToDb } from "./db";

const t = initTRPC.create();
export const appRouter = t.router({
  sayHello: t.procedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input: { name } }) => {
      return `Hello, ${name}`;
    }),

  things: t.router({
    add: t.procedure
      .input(z.object({ name: z.string().min(1) }))
      .mutation(({ input: newThing }) => {
        const newThingId = saveThingToDb(newThing);

        return { ...newThing, id: newThingId };
      }),
  }),
});

export type AppRouter = typeof appRouter;

createHTTPServer({
  router: appRouter,
  middleware: cors(),
}).listen(3000);
