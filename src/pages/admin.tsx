import { type Metadata } from "next";
import Image from "next/image";
import { MainNav } from "@/components/admin/main-nav";
import { Search } from "@/components/admin/search";
import { UserNav } from "@/components/admin/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { UsageChart } from "@/components/admin/overview";
import { RecentUrls as RecentUrls } from "@/components/admin/recent-urls";
import { Layout } from "@/ui/layout";
import { api } from "@/utils/api";
import { Skeleton } from "@/ui/skeleton";

export default function Admin() {
  return (
    <Layout>
        <div className="flex-col flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <Search disabled={true} />
                <UserNav />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              {/* <div className="flex items-center space-x-2">
                <CalendarDateRangePicker disabled={true} />
                <Button disabled={true}>Download</Button>
              </div> */}
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Browser
                </TabsTrigger>
                <TabsTrigger value="reports" disabled>
                  Reports
                </TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                  Troubleshooting
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <OverviewTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
    </Layout>
  );
}

const OverviewTab = () => {
  const { data: totalUrlsStats } = api.stats.getTotalUrls.useQuery();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          {/* TODO: implement comparison to last month */}
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
        {/* TODO: remove text-muted-foreground when implemented */}
        <Card className="text-muted-foreground">
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
            <div className="text-2xl font-bold">2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        {/* TODO: remove text-muted-foreground when implemented */}
        <Card className="text-muted-foreground">
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
            <div className="text-2xl font-bold">12234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        {/* TODO: remove text-muted-foreground when implemented */}
        <Card className="text-muted-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Engagement Time
            </CardTitle>
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
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0m 46s</div>
            <p className="text-xs text-muted-foreground">
              - 1.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UsageChart className="col-span-4"/>
        <RecentUrls className="col-span-3" />
      </div>
    </>
  );
};
