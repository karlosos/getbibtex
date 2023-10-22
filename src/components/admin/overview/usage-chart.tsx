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
        errorsCount: errorsCountPerDays
          ? calculateErrorsPercentage(
              urlsData.count,
              errorsCountPerDays[i]?.count,
            )
          : 0, // TODO: find a better way to combine those two arrays
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
              yAxisId="left"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: any) => `${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: any) => `${value}`}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ fill: "#cfe3df" }}
              contentStyle={{ borderRadius: "8px" }}
            />
            <Bar
              yAxisId="left"
              dataKey="urlsCount"
              fill="#50ad99"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="errorsCount"
              fill="#ffaac2"
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const calculateErrorsPercentage = (urlsCount: number, errorsCount?: number) => {
  // Calculates errors percentage in relative to urlsCount
  // Returns number with 2 digits
  let res = 0;

  if (errorsCount) {
    res = (errorsCount / urlsCount) * 100;
  }

  return Number(res.toFixed(2));
};
