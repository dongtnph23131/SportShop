import Link from "next/link";
import {
  BarChart3,
  Folder,
  Tag,
  ShoppingCart,
  User,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { UserNav } from "./user-nav";
import Cookies from "js-cookie";
import { Badge } from "../ui/badge";
import { isAfter } from "date-fns";
import { useAllOrdersQuery } from "@/services/orders/all-orders-query";

export default function Sidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const { data } = useAllOrdersQuery({
    refetchInterval: 10000,
  });

  const lastReadOrder = Cookies.get("lastReadOrder");

  const numberOfUnreadOrders = lastReadOrder
    ? data
      ? data.filter((order) =>
          isAfter(new Date(order.createdAt), new Date(lastReadOrder))
        ).length
      : 0
    : 2;

  const tabs = [
    {
      name: "Overview",
      href: "/",
      Icon: BarChart3,
    },
    {
      name: "Products",
      href: "/products",
      Icon: Tag,
    },
    {
      name: "Inventory",
      href: "/inventory",
      Icon: Archive,
    },
    {
      name: "Categories",
      href: "/categories",
      Icon: Folder,
    },
    {
      name: "Orders",
      href: "/orders",
      Icon: ShoppingCart,
    },
    {
      name: "Customers",
      href: "/customers",
      Icon: User,
    },
  ];

  return (
    <div className={cn("pb-12 h-full", className)}>
      <div>
        <UserNav />
      </div>
      <div className="my-4 flex flex-col px-2">
        <h1 className="text-gray-400 text-xs font-medium">Store</h1>
        <Button variant="link" className="inline-block" asChild>
          <Link href={"http://localhost:5173/"}>Sport shop</Link>
        </Button>
      </div>
      <div className="space-y-2 py-4">
        {tabs.map((tab, index) => {
          return (
            <Button
              key={index}
              variant={
                router.asPath.split("?")[0].split("/").slice(0, 2).join("/") ===
                tab.href
                  ? "default"
                  : "ghost"
              }
              onClick={() => {
                if (tab.href === "/orders") {
                  Cookies.set("lastReadOrder", new Date().toISOString());
                }
              }}
              className="w-full justify-start"
              asChild
            >
              <Link
                href={tab.href}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-1">
                  <tab.Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </div>
                {tab.href === "/orders" && numberOfUnreadOrders > 0 && (
                  <Badge variant={"blue"} className="rounded-full">
                    {numberOfUnreadOrders}
                  </Badge>
                )}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
