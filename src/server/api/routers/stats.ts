import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  entriesService,
  removeEntriesForUser,
} from "@/server/db/entries-service";
import {
  getErrorsCountPerDays,
  getErrorsCountWeekChange,
  getTotalErrorsCount,
  removeErrorsForUser,
} from "@/server/db/errors-service";
import { z } from "zod";

export const statsRouter = createTRPCRouter({
  //
  // Entries
  //
  getTotalUrls: protectedProcedure.query(async () => {
    try {
      const totalUrlsCount = await entriesService.getTotalUrlsCount();
      const weekChange = await entriesService.getTotalUrlsCountWeekChange();
      return {
        count: totalUrlsCount,
        weekChange: weekChange,
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  getRecentUrls: protectedProcedure.query(async () => {
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

  getLast7DaysUrlsCount: protectedProcedure.query(async () => {
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

  getUrlsCountPerDays: protectedProcedure.query(async () => {
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

  //
  // Users
  //
  getTotalUsers: protectedProcedure.query(async () => {
    try {
      const totalUsersCount = await entriesService.getTotalUsersCount();
      const weekChange = await entriesService.getUsersCountWeekChange();
      return {
        count: totalUsersCount,
        weekChange: weekChange,
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  //
  // Errors
  //
  getTotalErrors: protectedProcedure.query(async () => {
    try {
      const totalErrorsCount = await getTotalErrorsCount();
      const weekChange = await getErrorsCountWeekChange();
      return {
        count: totalErrorsCount,
        weekChange: weekChange,
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  getErrorsCountPerDays: protectedProcedure.query(async () => {
    try {
      const result = await getErrorsCountPerDays();
      return result;
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong happened on the server.",
      });
    }
  }),

  //
  // Admin
  //
  cleanAdminEntries: protectedProcedure
    .input(z.object({ userId: z.string().nonempty() }))
    .mutation(async ({ input }) => {
      try {
        await Promise.all([
          removeErrorsForUser({ userId: input.userId }),
          removeEntriesForUser({ userId: input.userId }),
        ]);
        return;
      } catch (e) {
        const error = e as Error;
        console.error(error.message);

        throw new TRPCError({
          cause: "Mine our yours stupidity.",
          code: "INTERNAL_SERVER_ERROR",
          message: error.message.toString(),
        });
      }
    }),
});
