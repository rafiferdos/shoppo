"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons"



import { HugeiconsIcon } from "@hugeicons/react"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        router.push("/dashboard")
    }

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
            <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-muted-foreground">Email address</Label>
                    <Input id="email" type="email" placeholder="example@gmail.com" required className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            required
                            className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? (
                                <HugeiconsIcon icon={ViewIcon} size={20} className="stroke-[1.5]" />
                            ) : (
                                <HugeiconsIcon icon={ViewOffIcon} size={20} className="stroke-[1.5]" />
                            )}
                            <span className="sr-only">Toggle password visibility</span>
                        </button>
                    </div>
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

                <Button type="submit" size={'lg'} disabled={isLoading} className="w-full h-12 rounded-full">
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    )
}
