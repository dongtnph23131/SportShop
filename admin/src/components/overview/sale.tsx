import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  startOfMonth,
} from "date-fns";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SaleAnalytics as SaleAnalyticsType } from "@/services/analytics/analytics";
import { formatPrice } from "@/lib/utils";

export function SaleAnalytics({ sale }: { sale?: SaleAnalyticsType }) {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const result = eachDayOfInterval({
    start: from ? new Date(from) : startOfMonth(new Date()),
    end: to ? new Date(to) : endOfMonth(new Date()),
  });

  const data = result.map((date) => {
    const dailySale = sale?.daily.find(
      (dailySale) => format(new Date(date), "yyyy-MM-dd") === dailySale._id
    );
    if (dailySale) {
      return {
        name: format(new Date(date), "dd/MM"),
        total: dailySale.total,
      };
    }
    return {
      name: format(new Date(date), "dd/MM"),
      total: 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng doanh thu</CardTitle>
        <CardDescription className="text-2xl font-bold text-black">
          {formatPrice(sale?.total ?? 0)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
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
              tickFormatter={(value) =>
                formatPrice(value, {
                  notation: "compact",
                })
              }
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
