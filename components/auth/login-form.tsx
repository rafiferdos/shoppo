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
            <div className="flex flex-col items-center gap-4 text-center">
                <Image
                    src="/assets/logo.png"
                    alt="Dubuy Logo"
                    width={100}
                    height={100}
                    className="size-24 object-contain"
                />
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Login To Your Account</h1>
                    <p className="text-muted-foreground text-sm text-balance max-w-md mx-auto">
                        Please log in to manage your dashboard and access all your administrative tools
                    </p>
                </div>
            </div>
            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-muted-foreground">Email address</Label>
                    <Input id="email" type="email" placeholder="example@gmail.com" required className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••••••" required className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" className="rounded border-muted-foreground/40 text-primary focus:ring-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                        <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">Remember me</Label>
                    </div>
                    <Link
                        href="/dashboard/forget-password"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" size={'lg'} className="w-full">
                    Login
                </Button>
            </form>
        </div>
    )
}
