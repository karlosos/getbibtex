import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { bookkeepingService } from "@/server/db/logs";

export const statsRouter = createTRPCRouter({
  // TODO: make this router protected
  getTotalUrlsCount: publicProcedure.query(async () => {
    try {
      const totalUrlsCount = bookkeepingService.getTotalUrlsCount();
      return totalUrlsCount;
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),
});
