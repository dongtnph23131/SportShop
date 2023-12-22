import { NextPageWithLayout } from "./_app";
import { SaleAnalytics } from "@/components/overview/sale";
import LayoutAdmin from "@/components/layouts";
import { useAnalyticsQuery } from "@/services/analytics/analytics";
import { DateRangePicker } from "@/components/date-range-picker";
import { useSearchParams } from "next/navigation";
import { OrderAnalytics } from "@/components/overview/orders";
import { useTopAnalyticsQuery } from "@/services/analytics/top-analytics-query";
import { TopProducts } from "@/components/overview/top-products";
import { Separator } from "@/components/ui/separator";
import { TopCustomers } from "@/components/overview/top-customers";
import { DateSelect } from "@/components/date-select-range-picker";

const Page: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const { data } = useAnalyticsQuery({
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    enabled: !!searchParams.get("from") && !!searchParams.get("to"),
  });

  const { data: topAnalytics } = useTopAnalyticsQuery();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Thống kê</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 h-full">
          <TopProducts topProducts={topAnalytics?.topProducts} />
        </div>
        <div className="col-span-1 h-full">
          <TopCustomers topCustomers={topAnalytics?.topCustomers} />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-end space-y-2">
          <DateSelect dayCount={30} />
        </div>

        <SaleAnalytics sale={data?.sale} />
        <OrderAnalytics orders={data?.orders} />
      </div>
    </div>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
