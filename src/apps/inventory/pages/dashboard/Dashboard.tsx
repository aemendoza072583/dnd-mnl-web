import EcommerceMetrics from "@/apps/inventory/components/EcommerceMetrics";
import MonthlySalesChart from "@/apps/inventory/components/MonthlySalesChart";
import StatisticsChart from "@/apps/inventory/components/StatisticsChart";
import MonthlyTarget from "@/apps/inventory/components/MonthlyTarget";
import RecentOrders from "@/apps/inventory/components/RecentOrders";
import PageMeta from "@/shared/components/common/PageMeta";

export default function Dashboard() {
  const pageTitle = "Inventory";

  return (
    <>
      <PageMeta title={`${import.meta.env.VITE_COMPANY_NAME} | ${pageTitle}`}/>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}

