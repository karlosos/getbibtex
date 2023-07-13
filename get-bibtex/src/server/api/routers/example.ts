import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { simulateDelay } from "@/utils/mocks";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getBibtexInfo: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      await simulateDelay(500, 1000);

      return {
        bibtexEntry: {
          author: "This is author",
          title: "This is title",
          accessed: "2022-04-03",
          url: input.url,
        },
      };
    }),

  getSecretMessage: protectedProcedure.query(async ({ ctx }) => {
    console.log(">> session", ctx.session.user);
    return "you can now see this secret message!";
  }),
});
