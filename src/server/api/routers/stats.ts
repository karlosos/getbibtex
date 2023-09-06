import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { entriesService } from "@/server/db/entries-service";

export const statsRouter = createTRPCRouter({
  // TODO: make this router protected
  getTotalUrls: publicProcedure.query(async () => {
    try {
      const totalUrlsCount = await entriesService.getTotalUrlsCount();
      const weekChange = await entriesService.getTotalUrlsCountWeekChange();
      return {
        count: totalUrlsCount,
        weekChange: weekChange
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  getTotalUsers: publicProcedure.query(async () => {
    try {
      const totalUsersCount = await entriesService.getTotalUsersCount();
      const weekChange = await entriesService.getUsersCountWeekChange();
      return {
        count: totalUsersCount,
        weekChange: weekChange
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  getRecentUrls: publicProcedure.query(async () => {
    try {
      const recentUrls = await entriesService.getRecentUrls();
      return recentUrls;
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  getLast7DaysUrlsCount: publicProcedure.query(async () => {
    try {
      const urlsCount = await entriesService.getLastDaysUrlsCount(7);
      return urlsCount;
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  getUrlsCountPerDays: publicProcedure.query(async () => {
    try {
      const result = await entriesService.getUrlsCountPerDays();
      return result;
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),
});
