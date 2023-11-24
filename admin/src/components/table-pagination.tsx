import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useRouterStuff from "@/lib/hooks/use-router-stuff";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Pagination } from "@/types/base";

interface TablePaginationProps<TData> {
  tableData: ({ docs: TData } & Pagination) | undefined;
}

export function TablePagination<TData>({
  tableData,
}: TablePaginationProps<TData>) {
  const { queryParams, searchParams } = useRouterStuff();

  return (
    <div className="flex items-center justify-end px-2 mt-4">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={searchParams.get("_limit") ?? "10"}
            onValueChange={(value) => {
              queryParams({
                set: {
                  _limit: value,
                },
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {tableData?.page} of {tableData?.totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              queryParams({
                set: {
                  _page: String(Number(searchParams.get("_page")) - 1),
                },
              });
            }}
            disabled={!tableData?.hasPrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              queryParams({
                set: {
                  _page: String(Number(searchParams.get("_page") ?? 1) + 1),
                },
              });
            }}
            disabled={!tableData?.hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TablePagination;
