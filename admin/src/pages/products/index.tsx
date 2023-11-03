import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import LayoutAdmin from "@/components/layouts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NextPageWithLayout } from "@/pages/_app";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Card>
        <div className="flex justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Here&apos;s a list of your products!
            </CardDescription>
          </CardHeader>
          <Button asChild>
            <Link href="/products/add">Add Product</Link>
          </Button>
        </div>
        <CardContent>
          {/* <DataTable data={data ?? []} columns={columns} /> */}
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
