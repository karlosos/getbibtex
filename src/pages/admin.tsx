import { MainNav } from "@/components/admin/main-nav";
import { Search } from "@/components/admin/search";
import { UserNav } from "@/components/admin/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Layout } from "@/ui/layout";
import { OverviewTab } from "@/components/admin/overview/overview-tab";
import { TroubleshootingTab } from "@/components/admin/troubleshooting/troubleshooting-tab";

export default function Admin() {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search disabled={true} />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl flex-1 space-y-4 p-8 pt-6">
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
              <TabsTrigger value="troubleshooting">
                Troubleshooting
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="troubleshooting" className="space-y-4">
              <TroubleshootingTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}