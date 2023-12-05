import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "../data-table/data-table-faceted-filter";
import { useCategoriesQuery } from "@/services/categories/categories-query";
import { useEffect } from "react";
import { ProductStatus } from "@/types/base";
import { SwitchGroup, SwitchGroupItem } from "../switch-group";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: categories } = useCategoriesQuery();

  useEffect(() => {
    table.getColumn("status")?.setFilterValue(ProductStatus.ACTIVE);
  }, [table]);

  return (
    <div>
      {table.getColumn("category") && (
        <SwitchGroup
          defaultValue={ProductStatus.ACTIVE}
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("status")?.setFilterValue(undefined);
            } else {
              table.getColumn("status")?.setFilterValue(value);
            }
          }}
        >
          <SwitchGroupItem value="all">Tất cả</SwitchGroupItem>
          <SwitchGroupItem value={ProductStatus.ACTIVE}>
            Hoạt động
          </SwitchGroupItem>
          <SwitchGroupItem value={ProductStatus.DRAFT}>
            Bản nháp
          </SwitchGroupItem>
          <SwitchGroupItem value={ProductStatus.ARCHIVED}>
            Lưu trữ
          </SwitchGroupItem>
        </SwitchGroup>
      )}

      <div className="mt-4 flex flex-1 items-center space-x-2">
        <Input
          placeholder="Tìm kiếm theo tên..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Danh mục"
            options={
              categories?.map((category) => ({
                label: category.name,
                value: category._id,
              })) ?? []
            }
          />
        )}

        {/* {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
