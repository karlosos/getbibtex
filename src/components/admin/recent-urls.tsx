import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { api } from "@/utils/api";
import { format } from "date-fns";

export function RecentUrls() {
  // TODO: do we want it here or should it be passed down?
  const { data: recentUrls } = api.stats.getRecentUrls.useQuery();

  return (
    <div className="space-y-8">
      {recentUrls?.map((entry) => (
        <>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 min-w-0 space-y-1">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-none">
                <a className="" href={entry.url}>
                  {entry.url}
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(entry.date), "yyyy-MM-dd HH:mm:ss")}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
