"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your new password below.
                </p>
            </div>
            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Reset Password
                </Button>
                <div className="text-center text-sm">
                    <Link href="/dashboard/login" className="underline underline-offset-4">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}
