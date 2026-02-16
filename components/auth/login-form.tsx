"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <Image
                    src="/assets/logo.png"
                    alt="Company Logo"
                    width={48}
                    height={48}
                    className="size-16 object-contain"
                />
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/dashboard/forget-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </div>
    )
}
