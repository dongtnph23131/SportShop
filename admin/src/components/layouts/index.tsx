import { ReactElement } from "react";
import { Sidebar } from "./sidebar";
import { Input } from "@/components/ui/input";
import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LayoutAdmin(page: ReactElement) {
  return (
    <div className="flex h-screen w-full">
      <div className="min-w-[240px] max-w-[240px] p-4 h-screen overflow-y-auto border-r">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="min-h-[56px] max-h-[56px] px-6 border-gray-200 flex w-full items-center justify-between border-b ">
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
        <main className="py-6 px-6 bg-gray-50 overflow-y-auto h-full">
          {page}
        </main>
      </div>
    </div>
  );
}
