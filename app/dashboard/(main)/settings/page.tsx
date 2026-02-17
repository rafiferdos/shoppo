"use client"

import { useState } from "react"
import { SettingsMenuItem } from "@/components/settings/settings-menu-item"
import { ChangePasswordDialog } from "@/components/settings/change-password-dialog"

export default function SettingsPage() {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

            <div className="space-y-4">
                <SettingsMenuItem
                    title="Personal Information"
                    href="/dashboard/settings/personal-information"
                />
                <SettingsMenuItem
                    title="Change Password"
                    onClick={() => setIsChangePasswordOpen(true)}
                />
                <SettingsMenuItem
                    title="About Us"
                    href="/dashboard/settings/about-us"
                />
                <SettingsMenuItem
                    title="Privacy Policy"
                    href="/dashboard/settings/privacy-policy"
                />
                <SettingsMenuItem
                    title="Terms & Condition"
                    href="/dashboard/settings/terms-conditions"
                />
            </div>

            <ChangePasswordDialog
                open={isChangePasswordOpen}
                onOpenChange={setIsChangePasswordOpen}
            />
        </div>
    )
}
