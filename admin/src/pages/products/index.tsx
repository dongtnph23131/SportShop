import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ExportCSVButton } from "@/components/export-button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { queryClient } from "@/lib/react-query";
import { NextPageWithLayout } from "@/pages/_app";
import { useProductDeleteMutation } from "@/services/products/product-delete-mutation";
import { useProductStatusMutation } from "@/services/products/product-status-mutation";
import { useProductsQuery } from "@/services/products/products-query";
import { Product, ProductStatus } from "@/types/base";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { toast } from "sonner";

const Page: NextPageWithLayout = () => {
  const { data: products } = useProductsQuery();
  const deleteProductMutation = useProductDeleteMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const setProductStatusMutation = useProductStatusMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const columns: ColumnDef<Product>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Avatar className="h-10 w-10 rounded-sm border border-gray-200">
            <AvatarImage
              src={
                row.original.images?.[0]?.url ??
                "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
              }
              alt="Avatar"
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          {row.original.name}
        </div>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <>
            {row.original.status === ProductStatus.ACTIVE && (
              <Badge variant={"success"}>Active</Badge>
            )}
            {row.original.status === ProductStatus.DRAFT && (
              <Badge variant="blue">{row.original.status}</Badge>
            )}
            {row.original.status === ProductStatus.ARCHIVED && (
              <Badge variant="destructive">{row.original.status}</Badge>
            )}
          </>
        );
      },
    },
    {
      id: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => <div>{row.original.code}</div>,
    },
    {
      id: "category",
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        return (
          <div>
            {row.original.categoryId ? (
              <Badge variant="outline">{row.original.categoryId.name}</Badge>
            ) : (
              "-"
            )}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.original.categoryId?._id);
      },
    },
    {
      id: "inventory",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Inventory" />
      ),
      cell: ({ row }) => {
        const inventory = row.original.productVariantIds.reduce(
          (acc, item) => item.inventory + acc,
          0
        );

        return `${inventory} in stock for ${row.original.productVariantIds.length} variant(s)`;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem asChild>
              <Link
                href={`/products/${encodeURIComponent(row.original.slug)}/edit`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/products/${encodeURIComponent(row.original.slug)}`}>
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                setProductStatusMutation.mutate(
                  {
                    id: row.original.slug,
                    status: ProductStatus.ACTIVE,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Product activated successfully!");
                    },
                  }
                );
              }}
            >
              Active
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                setProductStatusMutation.mutate(
                  {
                    id: row.original.slug,
                    status: ProductStatus.DRAFT,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Set as draft successfully!");
                    },
                  }
                );
              }}
            >
              Set as draft
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                setProductStatusMutation.mutate(
                  {
                    id: row.original.slug,
                    status: ProductStatus.ARCHIVED,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Archived product successfully!");
                    },
                  }
                );
              }}
            >
              Archive
            </DropdownMenuItem>
            {row.original.status === ProductStatus.ARCHIVED && (
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger className="w-full text-left hover:bg-red-100 hover:text-red-600 cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteProductMutation.mutate({
                            id: row.original._id,
                          });
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

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
          <div className="flex gap-2 items-center">
            <ExportCSVButton
              csvData={JSON.stringify(products)}
              fileName="products"
            />
            <Button asChild>
              <Link href="/products/add">Add Product</Link>
            </Button>
          </div>
        </div>
        <CardContent>
          <DataTable data={products ?? []} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
};

Page.getLayout = LayoutAdmin;

export default Page;
