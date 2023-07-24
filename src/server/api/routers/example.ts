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

  getSecretMessage: protectedProcedure.query(async ({ ctx }) => {
    console.log(">> session", ctx.session.user);
    simulateDelay(500, 1000);
    return "you can now see this secret message!";
  }),
});
