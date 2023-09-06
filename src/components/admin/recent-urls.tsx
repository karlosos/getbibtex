import { Avatar, AvatarFallback } from "@/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { api } from "@/utils/api";
import { format } from "date-fns";

export function RecentUrls({ className }: { className?: string }) {
  const { data: recentUrls } = api.stats.getRecentUrls.useQuery();
  const { data: last7DaysUrlsCount } =
    api.stats.getLast7DaysUrlsCount.useQuery();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent URLs</CardTitle>
        <CardDescription>
          {/* TODO: there is a problem with hydration here */}
          {last7DaysUrlsCount && (
            <>
              Users generated {last7DaysUrlsCount} entries in the last 7 days.
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentUrls?.map((entry) => {
            const userId = entry.userId?.slice(0, 3) ?? "X";
            const color = getUserColor(userId);

            return (
              <>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 text-xs">
                    <AvatarFallback
                      style={{backgroundColor: color}}
                    >
                      {userId}
                    </AvatarFallback>
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
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

const pastelColors = [
  "#E6A8D7",
  "#FFD700",
  "#A9A9A9",
  "#FFB6C1",
  "#98FB98",
  "#FFA07A",
  "#D8BFD8",
  "#FFDAB9",
  "#87CEEB",
  "#FFE4E1",
  "#E0FFFF",
  "#FFC0CB",
  "#F0E68C",
  "#DDA0DD",
  "#F5DEB3",
  "#AFEEEE",
  "#FFF5EE",
  "#FF69B4",
  "#B0C4DE",
  "#C2DFFF",
];

function getUserColor(userId: string) {
  // Generate a hash code for the user ID
  let hashCode = 0;
  for (let i = 0; i < userId.length; i++) {
    hashCode = (hashCode << 5) - hashCode + userId.charCodeAt(i);
  }

  // Ensure the hash code is non-negative
  const nonNegativeHashCode = Math.abs(hashCode);

  // Use the hash code to select a color from the pastelColors array
  const colorIndex = nonNegativeHashCode % pastelColors.length;

  // Return the selected color
  return pastelColors[colorIndex];
}
