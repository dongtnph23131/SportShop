import {
  Bar,
  BarChart,
  Legend,
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
import { OrderAnalytics } from "@/services/analytics/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function OrderAnalytics({ orders }: { orders?: OrderAnalytics }) {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const result = eachDayOfInterval({
    start: from ? new Date(from) : startOfMonth(new Date()),
    end: to ? new Date(to) : endOfMonth(new Date()),
  });

  const data = result.map((date) => {
    const dailySale = orders?.daily.find(
      (dailySale) => getDate(date) === dailySale._id
    );
    if (dailySale) {
      return {
        name: format(date, "dd/MM"),
        total: dailySale.total,
      };
    }
    return {
      name: format(date, "dd/MM"),
      total: 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Orders</CardTitle>
        <CardDescription className="text-2xl font-bold text-black">
          {orders?.total ?? 0}
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
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
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Bar dataKey="total" fill="#65c7f2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
