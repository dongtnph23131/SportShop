import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { discountTypes, roles } from "@/lib/contants";
import { DataTableFacetedFilter } from "../data-table/data-table-faceted-filter";
import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div>
      <div className="mt-4 flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by code..."
          value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("code")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={discountTypes.map((role) => ({
              label: role,
              value: role,
            }))}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={["Active", "Inactive"].map((role) => ({
              label: role,
              value: role,
            }))}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
