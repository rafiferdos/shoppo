"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgetPasswordPage() {
    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email address and we will send you a verification code.
                </p>
            </div>
            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <Button type="submit" className="w-full">
                    Send Verification Code
                </Button>
                <div className="text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/dashboard/login" className="underline underline-offset-4">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}
