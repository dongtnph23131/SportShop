import Link from "next/link";
import {
  BarChart3,
  Folder,
  Tag,
  ShoppingCart,
  User,
  Archive,
  Settings,
  UserCog,
  PercentCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Badge } from "../ui/badge";
import { isAfter } from "date-fns";
import { useAllOrdersQuery } from "@/services/orders/all-orders-query";
import { Separator } from "../ui/separator";
import { useProfileQuery } from "@/services/profile/profile-query";
import { UserRole } from "@/types/base";

export default function Sidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const { data } = useAllOrdersQuery({
    refetchInterval: 10000,
  });
  const { data: profile } = useProfileQuery();

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
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF].includes(profile.role)
        : false,
    },
    {
      name: "Products",
      href: "/products",
      Icon: Tag,
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF].includes(profile.role)
        : false,
    },
    {
      name: "Inventory",
      href: "/inventory",
      Icon: Archive,
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF].includes(profile.role)
        : false,
    },
    {
      name: "Categories",
      href: "/categories",
      Icon: Folder,
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF].includes(profile.role)
        : false,
    },
    {
      name: "Orders",
      href: "/orders",
      Icon: ShoppingCart,
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF, UserRole.SHIPPER].includes(
            profile.role
          )
        : false,
    },
    {
      name: "Customers",
      href: "/customers",
      Icon: User,
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF].includes(profile.role)
        : false,
    },
    {
      name: "Discounts",
      href: "/discounts",
      Icon: PercentCircle,
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF].includes(profile.role)
        : false,
    },
    {
      name: "Team",
      href: "/users",
      Icon: UserCog,
      isAccess: profile ? [UserRole.ADMIN].includes(profile.role) : false,
    },
    {
      name: "Settings",
      href: "/settings",
      Icon: Settings,
      isAccess: profile
        ? [UserRole.ADMIN, UserRole.STAFF].includes(profile.role)
        : false,
    },
  ];

  return (
    <div className={cn("pb-12 h-full", className)}>
      <Link
        href="/"
        className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
      >
        <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Acme Store logo"
            viewBox="0 0 32 28"
            className="h-4 w-4 fill-black dark:fill-white"
          >
            <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
            <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
          </svg>
        </div>
        <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
          Sport Shop
        </div>
      </Link>

      <Separator className="my-4" />

      <div className="space-y-2 py-4">
        {tabs.map((tab, index) => {
          return tab.isAccess ? (
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
          ) : null;
        })}
      </div>
    </div>
  );
}
