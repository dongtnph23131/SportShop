import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Inputs } from "./add-product-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export default function DescriptionGenerationAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormContext<Inputs>();

  return (
    <Popover open={isLoading || isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button type="button" size="icon" variant="ghost">
          <Sparkles className="h-4 w-4 text-fuchsia-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <form
          onSubmit={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            const prompt = (e.target as HTMLFormElement)["prompt"].value;

            const newPrompt = `Tạo cho tôi một đoạn mô tả cho sản phẩm ${form.getValues(
              "name"
            )} với các đặc điểm sau: ${prompt}`;

            setIsLoading(true);
            const response = await fetch("/api/ai/generate-description", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt: newPrompt,
              }),
            });
            setIsLoading(false);

            if (!response.ok) {
              const text = await response.text();
              toast.error(text);
              return;
            }

            const data = await response.json();
            setIsOpen(false);

            form.setValue("description", data);
          }}
        >
          <div className="space-y-2 mb-4">
            <h4 className="font-medium leading-none">
              Tạo mô tả sản phẩm bằng AI
            </h4>
          </div>

          <div className="mb-4">
            <Label htmlFor="prompt" className="text-sm font-medium">
              Đặc điểm và từ khóa
            </Label>
            <Textarea
              id="prompt"
              required
              className="mt-1"
              placeholder="100% cotton, made in Vietnam, ..."
            />
          </div>

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Generate Text
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
