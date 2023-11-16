import { NextPageWithLayout } from "./_app";
import { SaleAnalytics } from "@/components/overview/sale";
import LayoutAdmin from "@/components/layouts";
import { useAnalyticsQuery } from "@/services/analytics/analytics";
import { DateRangePicker } from "@/components/date-range-picker";
import { useSearchParams } from "next/navigation";
import { OrderAnalytics } from "@/components/overview/orders";

const Page: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const { data } = useAnalyticsQuery({
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    enabled: !!searchParams.get("from") && !!searchParams.get("to"),
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker align="end" dayCount={30} className="bg-white" />
        </div>
      </div>
      {/* <div className="grid gap-4 grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total orders</CardTitle>
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
            <div className="text-2xl font-bold">{data?.orders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total customers
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.customers}</div>
          </CardContent>
        </Card>
      </div> */}
      <SaleAnalytics sale={data?.sale} />
      <OrderAnalytics orders={data?.orders} />
    </div>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
