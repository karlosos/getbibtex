import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { api } from "@/utils/api";
import { formatDayMonth } from "@/utils/date-format";
import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function UsageChart({ className }: { className?: string }) {
  const { data: urlsCountPerDays } = api.stats.getUrlsCountPerDays.useQuery();
  const { data: errorsCountPerDays } =
    api.stats.getErrorsCountPerDays.useQuery();
  
  const data =
    urlsCountPerDays
      ?.map((urlsData, i) => ({
        label: formatDayMonth(urlsData.date),
        date: urlsData.date,
        urlsCount: urlsData.count,
        errorsCount: errorsCountPerDays ? errorsCountPerDays[i]?.count : 0, // TODO: find a better way to combine those two arrays
      }))
      .reverse() ?? [];


  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Usage</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data}>
            <XAxis
              dataKey="label"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: any) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "#cfe3df" }}
              contentStyle={{ borderRadius: "8px" }}
            />
            <Bar dataKey="urlsCount" fill="#50ad99" radius={[4, 4, 0, 0]} />
            <Bar dataKey="errorsCount" fill="#ffaac2" radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
