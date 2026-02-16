"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"

export default function VerifyOtpPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/dashboard/reset-password");
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
                    <h1 className="text-2xl font-bold tracking-tight">Verify OTP</h1>
                    <p className="text-muted-foreground text-sm text-balance max-w-md mx-auto">
                        Enter the 6-digit code sent to your email.
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="flex justify-center my-2">
                    <InputOTP maxLength={6}>
                        <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="rounded-md border-muted-foreground/30 size-12" />
                            <InputOTPSlot index={1} className="rounded-md border-muted-foreground/30 size-12" />
                            <InputOTPSlot index={2} className="rounded-md border-muted-foreground/30 size-12" />
                            <InputOTPSlot index={3} className="rounded-md border-muted-foreground/30 size-12" />
                            <InputOTPSlot index={4} className="rounded-md border-muted-foreground/30 size-12" />
                            <InputOTPSlot index={5} className="rounded-md border-muted-foreground/30 size-12" />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <Button type="submit" size="lg" className="w-full h-12 rounded-full">
                    Verify Code
                </Button>
                <div className="text-center text-sm">
                    Didn&apos;t receive code?{" "}
                    <Button variant="link" className="p-0 h-auto font-normal text-primary underline-offset-4 hover:text-primary/90">
                        Resend Code
                    </Button>
                </div>
            </form>
        </div>
    )
}
