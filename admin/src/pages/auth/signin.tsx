import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/contants";
import { useRouter } from "next/router";

export default function AuthenticationPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({ email: "", password: "" });

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
          <div className="grid gap-2">
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
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="**********"
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              onClick={async () => {
                const res = await fetch(`${API_URL}/api/admin/auth/sign-in`, {
                  method: "POST",
                  body: JSON.stringify(formValues),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (!res.ok) {
                  const errorMessage = await res.text();
                  console.error(errorMessage);
                  return;
                }

                const data = (await res.json()) as {
                  message: string;
                  token: string;
                };

                localStorage.setItem("token", data.token);
                router.push("/");
              }}
            >
              Sign In
            </Button>
          </div>
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
