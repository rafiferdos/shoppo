"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, Edit02Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"

export default function PersonalInformationPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "Ali Ahmed",
        email: "aliahmed@gmail.com",
        phone: "+218 92 123 4567"
    })

    const handleSave = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        setIsEditing(false)
        toast.success("Profile updated successfully")
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/settings" className="hover:bg-muted p-2 rounded-full transition-colors group">
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Personal Information</h1>
                </div>

                <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2 min-w-32 shadow-sm transition-all"
                    disabled={isLoading}
                >
                    {isEditing ? (
                        <>
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} />
                            Save Changes
                        </>
                    ) : (
                        <>
                            <HugeiconsIcon icon={Edit02Icon} size={18} />
                            Edit Profile
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 shadow-sm border border-border/40 h-fit">
                    <div className="relative h-36 w-36 rounded-full overflow-hidden border-4 border-white shadow-md ring-1 ring-border/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://ui-avatars.com/api/?name=Ali+Ahmed&background=10b5a3&color=fff&size=256"
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Profile</p>
                        <h2 className="text-2xl font-bold text-foreground">Admin</h2>
                    </div>
                </div>

                {/* Information Form */}
                <div className="md:col-span-2 space-y-6 bg-white rounded-2xl p-8 shadow-sm border border-border/40">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</Label>
                        <div className="relative">
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                                className="border-border/40 shadow-sm h-12 bg-muted/30 px-4 text-base font-medium disabled:opacity-100 disabled:bg-muted/10 disabled:cursor-default focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                className="border-border/40 shadow-sm h-12 bg-muted/30 px-4 text-base font-medium disabled:opacity-100 disabled:bg-muted/10 disabled:cursor-default focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground ml-1">Phone Number</Label>
                        <div className="relative">
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                                className="border-border/40 shadow-sm h-12 bg-muted/30 px-4 text-base font-medium disabled:opacity-100 disabled:bg-muted/10 disabled:cursor-default focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
