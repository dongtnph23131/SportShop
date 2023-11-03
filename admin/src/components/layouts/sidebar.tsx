import Link from "next/link";
import { BarChart3, Folder, Tag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { UserNav } from "./user-nav";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

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
      name: "Collections",
      href: "/collections",
      Icon: Folder,
    },
    {
      name: "Orders",
      href: "/orders",
      Icon: ShoppingCart,
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
          <Link href={"/store"}>Sport shop</Link>
        </Button>
      </div>
      <div className="space-y-2 py-4">
        {tabs.map((tab, index) => {
          return (
            <Button
              key={index}
              variant={
                router.asPath.split("?")[0].split("/").slice(0, 3).join("/") ===
                tab.href
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start"
              asChild
            >
              <Link href={tab.href}>
                <tab.Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
