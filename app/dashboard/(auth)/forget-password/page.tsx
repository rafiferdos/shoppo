"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ForgetPasswordPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically trigger the API to send the code
        router.push("/dashboard/verify-otp");
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
                    <h1 className="text-2xl font-bold tracking-tight">Recover Password</h1>
                    <p className="text-muted-foreground text-sm text-balance max-w-md mx-auto">
                        Please provide the email address associated with your account, and we&apos;ll send you verification code to reset your password.
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-muted-foreground">Email address</Label>
                    <Input id="email" type="email" placeholder="example@gmail.com" required className="rounded-full px-4 h-12 bg-muted/30 border-muted-foreground/20" />
                </div>
                <Button type="submit" size="lg" className="w-full h-12 rounded-full">
                    Send Code
                </Button>
            </form>
        </div>
    )
}
