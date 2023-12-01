import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/contants";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { User, UserRole } from "@/types/base";

export default function AuthenticationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Sport shop
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement)["email"].value;
              const password = (e.target as HTMLFormElement)["password"].value;

              try {
                setIsLoading(true);
                const res = await fetch(`${API_URL}/api/admin/auth/sign-in`, {
                  method: "POST",
                  body: JSON.stringify({
                    email,
                    password,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (!res.ok) {
                  const errorMessage = await res.text();
                  toast.error(errorMessage);
                  console.error(errorMessage);
                  return;
                }

                const data = (await res.json()) as {
                  message: string;
                  token: string;
                  user: User;
                };

                localStorage.setItem("token", data.token);

                if (data.user.role === UserRole.SHIPPER) {
                  router.push("/orders");
                } else {
                  router.push("/");
                }
              } catch (error) {
                toast.error("Something went wrong!");
              } finally {
                setIsLoading(false);
              }
            }}
            className="grid gap-2"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                required
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                placeholder="**********"
              />
            </div>
            <Button type="submit">Sign In</Button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
