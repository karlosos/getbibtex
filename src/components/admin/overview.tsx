import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { api } from "@/utils/api";
import { formatDayMonth } from "@/utils/date-format";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function UsageChart({className}: {className?: string}) {
  const { data: countPerDays } = api.stats.getUrlsCountPerDays.useQuery();

  const data = countPerDays?.map(({date, count}) => ({
    label: formatDayMonth(date),
    date: date,
    count: count,
  })).reverse() ?? [];
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Usage</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
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
              cursor={{fill: '#cfe3df'}} 
              contentStyle={{borderRadius: '8px'}}
            />
            <Bar dataKey="count" fill="#50ad99" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
