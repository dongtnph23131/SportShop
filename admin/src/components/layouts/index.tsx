import { ReactElement, useEffect } from "react";
import { BellRing } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./sidebar"), { ssr: false });

export default function LayoutAdmin(page: ReactElement) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
    }
  }, [router]);

  return (
    <div className="h-screen w-full relative">
      <div className="min-w-[240px] max-w-[240px] p-4 h-screen overflow-y-auto border-r fixed">
        <Sidebar />
      </div>
      <div className="absolute left-[240px] right-0">
        <div className="min-h-[56px] max-h-[56px] px-6 border-gray-200 flex w-full items-center justify-between border-b sticky top-0 z-50 bg-white">
          <div className="flex flex-1 items-center justify-between space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
            <Button variant="ghost" size="icon">
              <BellRing className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <main className="py-6 px-6 bg-gray-50 min-h-[calc(100vh-56px)]">
          {page}
        </main>
      </div>
    </div>
  );
}
