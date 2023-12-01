import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useCommentsByProductQuery } from "@/services/products/comments-query";
import Link from "next/link";
import { format } from "date-fns";
import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";

const PAGE_SIZE = 5;

const ProductReview = ({ productId }: { productId: string }) => {
  const { data: comments } = useCommentsByProductQuery({ slug: productId });

  const [page, setPage] = React.useState(1);

  const filteredComments = React.useMemo(() => {
    return comments?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [comments, page]);

  if (!comments) return <p>Loading ...</p>;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>Here&apos;s reviews for this product</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {filteredComments?.map((comment) => (
          <div
            key={comment._id}
            className="border border-gray-300 rounded-md p-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={comment.customerId.avatar} alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <h6 className="font-bold">
                    {comment.customerId.firstName +
                      " " +
                      comment.customerId.lastName}
                  </h6>
                  <p className="text-sm">{comment.customerId.email}</p>
                </div>
              </div>

              {comment.isHidden && (
                <Badge variant={"destructive"}>Hidden</Badge>
              )}

              <div className="flex gap-2 items-center">
                {!comment.isHidden && (
                  <Button
                    variant={"secondary"}
                    onClick={async () => {
                      const res = await axiosClient.put(
                        `/comments/${comment._id}/hide`
                      );

                      if (res.status === 200) {
                        toast.success("Comment hidden successfully");
                      } else {
                        toast.error("Failed to hide comment");
                      }
                    }}
                  >
                    Hide review
                  </Button>
                )}
                <Button asChild>
                  <Link href={`/customers/${comment.customerId._id}`}>
                    View Customer
                  </Link>
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <dl className="mt-2 flex gap-2">
              <dt>Created At:</dt>
              <dd className="flex flex-wrap gap-3 font-medium">
                {format(new Date(comment.createdAt), "dd MMM yyyy hh:mm a")}
              </dd>
            </dl>

            <dl className="mt-2 flex gap-2">
              <dt>Rating:</dt>
              <dd className="flex flex-wrap gap-3 font-medium">
                <Badge variant={"outline"}>{comment.raiting}</Badge>
              </dd>
            </dl>

            <Accordion type="single" collapsible>
              <AccordionItem value="description">
                <AccordionTrigger>Comment</AccordionTrigger>
                <AccordionContent>{comment.content}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </CardContent>

      <Separator className="my-4" />

      <CardFooter className="flex justify-between">
        <p className="text-sm">
          Showing{" "}
          <strong>
            {comments.findIndex(
              (comment) => comment._id === filteredComments?.[0]._id
            ) + 1}
          </strong>{" "}
          to{" "}
          <strong>
            {comments.findIndex(
              (comment) =>
                comment._id ===
                filteredComments?.[filteredComments?.length - 1]._id
            ) + 1}
          </strong>{" "}
          of <strong>{comments.length}</strong> results
        </p>
        <div className="flex gap-2 items-center">
          <Button
            variant={"outline"}
            onClick={() => {
              if (page > 1) setPage((prev) => prev - 1);
            }}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              if (page < comments.length / PAGE_SIZE)
                setPage((prev) => prev + 1);
            }}
            disabled={page === Math.ceil(comments.length / PAGE_SIZE)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductReview;
