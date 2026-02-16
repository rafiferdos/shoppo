"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                    <Input id="password" type="password" placeholder="••••••••••••" required className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••••••" required className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20" />
                </div>
                <Button type="submit" size="lg" className="w-full h-12">
                    Submit
                </Button>
            </form>
        </div>
    )
}
