"use client"

import { useState, useRef, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    ArrowLeft01Icon,
    LockIcon,
    Mail01Icon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

type DialogView = "change" | "forgot-email" | "forgot-otp" | "forgot-update"

interface ChangePasswordDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
    const [view, setView] = useState<DialogView>("change")
    const [isLoading, setIsLoading] = useState(false)

    // Change Password form
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Forgot Password form
    const [email, setEmail] = useState("")

    // OTP
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const otpRefs = useRef<(HTMLInputElement | null)[]>([])

    // Reset Password form
    const [resetPassword, setResetPassword] = useState("")
    const [resetConfirmPassword, setResetConfirmPassword] = useState("")

    // Reset all state when dialog closes
    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setView("change")
                setOldPassword("")
                setNewPassword("")
                setConfirmPassword("")
                setEmail("")
                setOtp(["", "", "", "", "", ""])
                setResetPassword("")
                setResetConfirmPassword("")
                setIsLoading(false)
            }, 200)
        }
    }, [open])

    // Handle OTP input
    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1)
        }
        if (value && !/^\d$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus()
        }
    }

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus()
        }
    }

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
        const newOtp = [...otp]
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i]
        }
        setOtp(newOtp)
        const nextEmpty = newOtp.findIndex(v => !v)
        if (nextEmpty !== -1) {
            otpRefs.current[nextEmpty]?.focus()
        } else {
            otpRefs.current[5]?.focus()
        }
    }

    // API-ready handlers
    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        if (newPassword.length < 8 || newPassword.length > 10) {
            toast.error("Password must be 8-10 characters long")
            return
        }

        setIsLoading(true)
        // TODO: Replace with actual API call
        // await api.post('/auth/change-password', { oldPassword, newPassword })
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast.success("Password updated successfully")
        onOpenChange(false)
    }

    const handleSendOtp = async () => {
        if (!email) {
            toast.error("Please enter your email")
            return
        }

        setIsLoading(true)
        // TODO: Replace with actual API call
        // await api.post('/auth/forgot-password', { email })
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast.success("OTP sent to your email")
        setView("forgot-otp")
    }

    const handleVerifyOtp = async () => {
        const otpValue = otp.join("")
        if (otpValue.length !== 6) {
            toast.error("Please enter the complete OTP")
            return
        }

        setIsLoading(true)
        // TODO: Replace with actual API call
        // await api.post('/auth/verify-otp', { email, otp: otpValue })
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast.success("OTP verified successfully")
        setView("forgot-update")
    }

    const handleResendOtp = async () => {
        setIsLoading(true)
        // TODO: Replace with actual API call
        // await api.post('/auth/resend-otp', { email })
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast.success("OTP resent to your email")
    }

    const handleResetPassword = async () => {
        if (!resetPassword || !resetConfirmPassword) {
            toast.error("Please fill in all fields")
            return
        }
        if (resetPassword !== resetConfirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setIsLoading(true)
        // TODO: Replace with actual API call
        // await api.post('/auth/reset-password', { email, otp: otp.join(''), newPassword: resetPassword })
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast.success("Password reset successfully")
        onOpenChange(false)
    }

    const handleBack = () => {
        switch (view) {
            case "forgot-email":
                setView("change")
                break
            case "forgot-otp":
                setView("forgot-email")
                break
            case "forgot-update":
                setView("forgot-otp")
                break
            default:
                onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
                {/* ── Change Password View ── */}
                {view === "change" && (
                    <div className="p-6 space-y-5">
                        <DialogHeader className="space-y-2">
                            <div className="flex items-center gap-2">
                                <button onClick={() => onOpenChange(false)} className="hover:bg-muted p-1.5 rounded-full transition-colors">
                                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                                </button>
                                <DialogTitle className="text-xl font-bold">Change Password</DialogTitle>
                            </div>
                            <DialogDescription className="text-sm text-muted-foreground ml-9">
                                Your password must be 8-10 character long.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="old-password" className="text-sm font-semibold">Enter old password</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <HugeiconsIcon icon={LockIcon} size={18} />
                                    </div>
                                    <Input
                                        id="old-password"
                                        type="password"
                                        placeholder="Enter old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="pl-10 h-11 bg-muted/30 border-border/40 focus-visible:ring-primary/20 focus-visible:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="new-password" className="text-sm font-semibold">Set new password</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <HugeiconsIcon icon={LockIcon} size={18} />
                                    </div>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        placeholder="Set new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="pl-10 h-11 bg-muted/30 border-border/40 focus-visible:ring-primary/20 focus-visible:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm-password" className="text-sm font-semibold">Re-enter new password</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <HugeiconsIcon icon={LockIcon} size={18} />
                                    </div>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Re-enter new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10 h-11 bg-muted/30 border-border/40 focus-visible:ring-primary/20 focus-visible:border-primary"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setView("forgot-email")}
                                className="text-sm text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Button
                            onClick={handleChangePassword}
                            disabled={isLoading}
                            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm"
                        >
                            {isLoading ? "Updating..." : "Update password"}
                        </Button>
                    </div>
                )}

                {/* ── Forgot Password — Enter Email ── */}
                {view === "forgot-email" && (
                    <div className="p-6 space-y-5">
                        <DialogHeader className="space-y-2">
                            <div className="flex items-center gap-2">
                                <button onClick={handleBack} className="hover:bg-muted p-1.5 rounded-full transition-colors">
                                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                                </button>
                                <DialogTitle className="text-xl font-bold">Forgot Password</DialogTitle>
                            </div>
                            <DialogDescription className="text-sm text-muted-foreground ml-9">
                                Please enter your email address to reset your password.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="forgot-email" className="text-sm font-semibold">Enter Your Email</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <HugeiconsIcon icon={Mail01Icon} size={18} />
                                    </div>
                                    <Input
                                        id="forgot-email"
                                        type="email"
                                        placeholder="Enter your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-11 bg-muted/30 border-border/40 focus-visible:ring-primary/20 focus-visible:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleSendOtp}
                            disabled={isLoading}
                            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm"
                        >
                            {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                    </div>
                )}

                {/* ── Forgot Password — Verify OTP ── */}
                {view === "forgot-otp" && (
                    <div className="p-6 space-y-5">
                        <DialogHeader className="space-y-2">
                            <div className="flex items-center gap-2">
                                <button onClick={handleBack} className="hover:bg-muted p-1.5 rounded-full transition-colors">
                                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                                </button>
                                <DialogTitle className="text-xl font-bold">Verify Email</DialogTitle>
                            </div>
                            <DialogDescription className="text-sm text-muted-foreground ml-9">
                                Please enter the OTP we have sent you in your email.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { otpRefs.current[index] = el }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-14 text-center text-xl font-bold border border-border/60 rounded-xl bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-sm px-1">
                                <span className="text-muted-foreground">Didn&apos;t receive the code?</span>
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={isLoading}
                                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                                >
                                    Resend
                                </button>
                            </div>
                        </div>

                        <Button
                            onClick={handleVerifyOtp}
                            disabled={isLoading}
                            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm"
                        >
                            {isLoading ? "Verifying..." : "Verify"}
                        </Button>
                    </div>
                )}

                {/* ── Forgot Password — Update Password ── */}
                {view === "forgot-update" && (
                    <div className="p-6 space-y-5">
                        <DialogHeader className="space-y-2">
                            <div className="flex items-center gap-2">
                                <button onClick={handleBack} className="hover:bg-muted p-1.5 rounded-full transition-colors">
                                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                                </button>
                                <DialogTitle className="text-xl font-bold">Update Password</DialogTitle>
                            </div>
                            <DialogDescription className="text-sm text-muted-foreground ml-9">
                                Please enter your new password.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reset-password" className="text-sm font-semibold">Set new password</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <HugeiconsIcon icon={LockIcon} size={18} />
                                    </div>
                                    <Input
                                        id="reset-password"
                                        type="password"
                                        placeholder="Set new password"
                                        value={resetPassword}
                                        onChange={(e) => setResetPassword(e.target.value)}
                                        className="pl-10 h-11 bg-muted/30 border-border/40 focus-visible:ring-primary/20 focus-visible:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reset-confirm-password" className="text-sm font-semibold">Re-enter new password</Label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <HugeiconsIcon icon={LockIcon} size={18} />
                                    </div>
                                    <Input
                                        id="reset-confirm-password"
                                        type="password"
                                        placeholder="Re-enter new password"
                                        value={resetConfirmPassword}
                                        onChange={(e) => setResetConfirmPassword(e.target.value)}
                                        className="pl-10 h-11 bg-muted/30 border-border/40 focus-visible:ring-primary/20 focus-visible:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
