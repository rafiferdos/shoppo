"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, PencilEdit02Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/settings" className="hover:bg-muted p-2 rounded-full transition-colors">
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Personal Information</h1>
                </div>

                <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2 min-w-[120px]"
                    disabled={isLoading}
                >
                    {isEditing ? (
                        <>
                            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} />
                            Save
                        </>
                    ) : (
                        <>
                            <HugeiconsIcon icon={PencilEdit02Icon} size={18} />
                            Edit Profile
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center space-y-4 shadow-sm h-fit">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                        {/* Placeholder image logic, using a reliable placeholder source or local asset if available */}
                        {/* Assuming we have assets or using a generic placeholder */}
                        <Image
                            src="/assets/avatar-placeholder.png"
                            alt="Profile"
                            fill
                            className="object-cover"
                            // Fallback if asset missing
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://ui-avatars.com/api/?name=Ali+Ahmed&background=10b5a3&color=fff&size=128";
                            }}
                        />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-muted-foreground font-medium">Profile</p>
                        <h2 className="text-xl font-bold">Admin</h2>
                    </div>
                </div>

                {/* Information Form */}
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-base text-muted-foreground font-normal ml-1">Name</Label>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                                className="border-none shadow-none h-12 bg-white px-4 text-base font-medium disabled:opacity-100 disabled:bg-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-base text-muted-foreground font-normal ml-1">Email</Label>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                className="border-none shadow-none h-12 bg-white px-4 text-base font-medium disabled:opacity-100 disabled:bg-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base text-muted-foreground font-normal ml-1">Phone Number</Label>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                                className="border-none shadow-none h-12 bg-white px-4 text-base font-medium disabled:opacity-100 disabled:bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
