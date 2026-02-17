"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    SidebarFooter,
    useSidebar,
    SidebarInset
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout01Icon } from "@hugeicons/core-free-icons"
import { NotificationsPopover } from "@/components/dashboard/notifications-popover"

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

function AppSidebar() {
    const pathname = usePathname()
    const { state, isMobile } = useSidebar()

    return (
        <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className={cn(
                "flex items-center justify-center py-6 transition-all duration-300",
                state === "collapsed" ? "px-2" : "px-4"
            )}>
                <Link href="/dashboard" className="flex items-center justify-center overflow-hidden w-full">
                    <div className={cn(
                        "relative transition-all duration-300",
                        state === "collapsed" ? "size-10" : "size-20"
                    )}>
                        <Image src="/assets/logo.png" fill alt="Dubuy Logo" className="object-contain" />
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                <SidebarMenu className="gap-1.5">
                    {sidebarItems.map((item) => {
                        const isActive = item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href)

                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    isActive={isActive}
                                    size="lg"
                                    render={<Link href={item.href} />}
                                    className={cn(
                                        "transition-all duration-200 flex items-center gap-4 px-3",
                                        "group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center",
                                        isActive
                                            ? "bg-primary! text-primary-foreground! hover:bg-primary/90! hover:text-primary-foreground! font-semibold shadow-sm"
                                            : "text-muted-foreground hover:text-foreground font-medium"
                                    )}
                                >
                                    <div className="size-6 relative shrink-0 flex items-center justify-center">
                                        <Image
                                            src={item.icon}
                                            fill
                                            alt={item.title}
                                            className={cn(
                                                "object-contain transition-all",
                                                isActive
                                                    ? "brightness-0 invert"
                                                    : "grayscale opacity-70 group-hover/menu-button:grayscale-0 group-hover/menu-button:opacity-100"
                                            )}
                                        />
                                    </div>
                                    <span className="truncate text-sm group-data-[collapsible=icon]:hidden">
                                        {item.title}
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4 mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={<Link href="/dashboard/login" />}
                            className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-3 group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
                        >
                            <div className="size-6 relative shrink-0 flex items-center justify-center">
                                <Image
                                    src="/assets/dashboard-icons-svg/logout.svg"
                                    fill
                                    alt="Logout"
                                    className="object-contain grayscale opacity-70 group-hover/menu-button:grayscale-0 group-hover/menu-button:opacity-100"
                                />
                            </div>
                            <span className="truncate font-medium text-sm group-data-[collapsible=icon]:hidden">
                                Logout
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}

export default function DashboardMainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background px-6 border-b border-border/40">
                    <SidebarTrigger className="-ml-2 h-9 w-9 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" />
                    <div className="flex flex-col ml-1">
                        <h1 className="text-base font-semibold text-foreground leading-tight">Welcome, Dino</h1>
                        <p className="text-xs text-muted-foreground">Have a nice day!</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <NotificationsPopover />

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 h-9 rounded-full px-1.5 pr-3 hover:bg-muted transition-all outline-none cursor-pointer">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/assets/logo.png"
                                    alt="User Avatar"
                                    className="h-7 w-7 rounded-full object-cover bg-muted shrink-0"
                                />
                                <span className="text-sm font-medium text-foreground">Dino</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                    <HugeiconsIcon icon={Logout01Icon} size={16} className="mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
