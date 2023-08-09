import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getCitation } from "@/server/citations/getCitationData";
import { TRPCError } from "@trpc/server";
import { bookkeepingService } from "@/server/db/logs";

export const citationsRouter = createTRPCRouter({
  getBibtexInfo: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const res = getCitation(input.url);
        bookkeepingService.saveRequestToDb(input.url).catch((e) => console.log(">> db saving", e));

        return res;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something wrong happened on the server.",
        });
      }
    }),
});
