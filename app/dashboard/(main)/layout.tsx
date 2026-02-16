"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "/assets/dashboard-icons-svg/dashboard.svg"
    },
    {
        title: "Account Details",
        href: "/dashboard/account-details",
        icon: "/assets/dashboard-icons-svg/account-details.svg"
    },
    {
        title: "Manage Category",
        href: "/dashboard/manage-categories",
        icon: "/assets/dashboard-icons-svg/manage-category.svg"
    },
    {
        title: "Quotations",
        href: "/dashboard/quotations",
        icon: "/assets/dashboard-icons-svg/quotations.svg"
    },
    {
        title: "Payment Tracking",
        href: "/dashboard/payment-tracking",
        icon: "/assets/dashboard-icons-svg/payment-tracking.svg"
    },
    {
        title: "Order Management",
        href: "/dashboard/order-management",
        icon: "/assets/dashboard-icons-svg/order-management.svg"
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: "/assets/dashboard-icons-svg/settings.svg"
    }
]

export default function DashboardMainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-muted/20">
            <aside className="w-full md:w-64 bg-background border-r hidden md:block h-screen sticky top-0">
                <div className="flex h-full flex-col gap-8 p-6">
                    {/* Logo Section */}
                    <div className="flex items-center justify-center p-1">
                        <Link href="/dashboard" className="flex items-center justify-center">
                            <div className="relative size-20">
                                <Image src="/assets/logo.png" fill alt="Dubuy Logo" className="object-contain" />
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 flex flex-col justify-between">
                        <nav className="flex flex-col gap-2">
                            {sidebarItems.map((item) => {
                                // Exact match for dashboard, startsWith for others to handle sub-routes if any
                                const isActive = item.href === "/dashboard"
                                    ? pathname === "/dashboard"
                                    : pathname.startsWith(item.href)



                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-primary"
                                        )}
                                    >
                                        <div className="size-5 relative">
                                            <Image
                                                src={item.icon}
                                                fill
                                                alt={item.title}
                                                // If active (bg-primary), icon should be white (invert). 
                                                // If inactive, icon is likely grey/muted. 
                                                // If hover (text-primary), icon works? SVGs as images are hard to color via CSS classes unless mask.
                                                // Using CSS filter is a good way for SVGs in Image tags.
                                                className={cn(
                                                    "object-contain transition-all",
                                                    isActive ? "brightness-0 invert" : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 placeholder-icon"
                                                    // The user said "hover will have color-primary". 
                                                    // SVGs as <img> tags don't inherit text color. 
                                                    // I need to use a CSS filter to colorize them if they correspond to "primary".
                                                    // Or just leave them as images if they are pre-colored.
                                                    // The screenshot shows grey icons. Active one is white.
                                                    // I will assume they are grey by default.
                                                )}
                                                style={!isActive ? {} : {}}
                                            />
                                        </div>
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="mt-auto flex flex-col gap-2">
                            {/* Settings is usually here in many layouts, but in the screenshot it was above logout. 
                                I included it in the main list above with a specific variant check or margin if needed.
                                Actually, looking at the crop, Settings is just above Logout. 
                                So I will move Settings here? 
                                User list had Settings then Logout.
                                I will keep Settings in the main map but maybe just add marginTop to it?
                                No, let's put Settings and Logout in this bottom section.
                             */}


                            <Link
                                href="/dashboard/login"
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
                            >
                                <div className="size-5 relative">
                                    <Image
                                        src="/assets/dashboard-icons-svg/logout.svg"
                                        fill
                                        alt="Logout"
                                        className="object-contain grayscale opacity-70"
                                    />
                                </div>
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    )
}
