"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons"

export default function ResetPasswordPage() {
    const router = useRouter();
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push("/dashboard/login");
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <Image
                    src="/assets/logo.png"
                    alt="Dubuy Logo"
                    width={100}
                    height={100}
                    className="size-24 object-contain"
                />
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
                    <p className="text-muted-foreground text-sm text-balance max-w-md mx-auto">
                        Set your new password to regain access to your account.
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="password">Set New Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            required
                            className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showNewPassword ? (
                                <HugeiconsIcon icon={ViewIcon} size={20} className="stroke-[1.5]" />
                            ) : (
                                <HugeiconsIcon icon={ViewOffIcon} size={20} className="stroke-[1.5]" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            required
                            className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showConfirmPassword ? (
                                <HugeiconsIcon icon={ViewIcon} size={20} className="stroke-[1.5]" />
                            ) : (
                                <HugeiconsIcon icon={ViewOffIcon} size={20} className="stroke-[1.5]" />
                            )}
                        </button>
                    </div>
                </div>
                <Button type="submit" size="lg" className="w-full h-12 rounded-full">
                    Submit
                </Button>
            </form>
        </div>
    )
}
