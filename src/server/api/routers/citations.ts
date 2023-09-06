import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getCitation } from "@/server/citations/get-citation-data";
import { TRPCError } from "@trpc/server";
import { entriesService } from "@/server/db/entries-service";

export const citationsRouter = createTRPCRouter({
  getBibtexInfo: publicProcedure
    .input(z.object({ url: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const res = getCitation(input.url);
        entriesService
          .saveRequestToDb({
            url: input.url,
            userId: input.userId,
          })
          .catch((e) => console.log(">> db saving", e));

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
