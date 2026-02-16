"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export default function VerifyOtpPage() {
    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Verify OTP</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter the 6-digit code sent to your email.
                </p>
            </div>
            <form className="grid gap-6">
                <div className="flex justify-center">
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <Button type="submit" className="w-full">
                    Verify Code
                </Button>
                <div className="text-center text-sm">
                    Didn't receive code?{" "}
                    <Button variant="link" className="p-0 h-auto font-normal underline underline-offset-4">
                        Resend Code
                    </Button>
                </div>
                <div className="text-center text-sm mt-2">
                    <Link href="/dashboard/login" className="underline underline-offset-4">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}
