import { api } from "@/utils/api";
import { Skeleton } from "@/ui/skeleton";
import { Button } from "@/ui/button";
import { useUserId } from "@/utils/use-user-id";
import { useToast } from "@/ui/use-toast";
import { getCurrentDateTimeString } from "@/utils/date-format";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { UsageChart } from "@/components/admin/overview/usage-chart";
import { RecentUrls as RecentUrls } from "@/components/admin/overview/recent-urls";

export const OverviewTab = () => {
  const trpc = api.useContext();
  const userId = useUserId();

  const { data: totalUrlsStats } = api.stats.getTotalUrls.useQuery();
  const { data: totalUsersStats } = api.stats.getTotalUsers.useQuery();
  const { data: totalErorsStats } = api.stats.getTotalErrors.useQuery();

  const cleanAdminEntries = api.stats.cleanAdminEntries.useMutation(
    {
      onSuccess: async () => {
        await trpc.stats.invalidate(); 
        toast({
          variant: "default",
          title: "Successfully removed all admin entries",
          description: getCurrentDateTimeString(),
        })
      },
      onError: ({message}) => {
        toast({
          variant: "destructive",
          title: "Couldn't remove admin entries",
          description: message,
        })
      },
    }
  );

  const { toast } = useToast();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Urls Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total URLs</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <line x1="18" x2="18" y1="20" y2="10"></line>
              <line x1="12" x2="12" y1="20" y2="4"></line>
              <line x1="6" x2="6" y1="20" y2="14"></line>
            </svg>
          </CardHeader>
          <CardContent>
            {totalUrlsStats ? (
              <>
                <div className="text-2xl font-bold">{totalUrlsStats.count}</div>
                <p className="text-xs text-muted-foreground">
                  {totalUrlsStats.weekChange}% w/w change
                </p>
              </>
            ) : (
              <>
                <Skeleton className="mb-1 h-7 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
              </>
            )}
          </CardContent>
        </Card>
        {/* Total Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            {totalUsersStats ? (
              <>
                <div className="text-2xl font-bold">
                  {totalUsersStats.count}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalUsersStats.weekChange}% w/w change
                </p>
              </>
            ) : (
              <>
                <Skeleton className="mb-1 h-7 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
              </>
            )}
          </CardContent>
        </Card>
        {/* Errors Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
            </svg>
          </CardHeader>
          <CardContent>
            {totalErorsStats ? (
              <>
                <div className="text-2xl font-bold">
                  {totalErorsStats.count}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalErorsStats.weekChange}% w/w change
                </p>
              </>
            ) : (
              <>
                <Skeleton className="mb-1 h-7 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
              </>
            )}
          </CardContent>
        </Card>
        {/* Admin actions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Actions</CardTitle>
            <svg
              data-v-f24af897=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => cleanAdminEntries.mutate({ userId: userId})}
              disabled={cleanAdminEntries.isLoading}
            >
              {cleanAdminEntries.isLoading && <span className="loading"></span>}
              Clean Admin Entries
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UsageChart className="col-span-4" />
        <RecentUrls className="col-span-3" />
      </div>
    </>
  );
};