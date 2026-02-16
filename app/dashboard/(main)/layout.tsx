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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Notification01Icon, Logout01Icon } from "@hugeicons/core-free-icons"

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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function AppSidebar() {
    const pathname = usePathname()
    const { state, isMobile } = useSidebar()

    return (
        <Sidebar collapsible="icon" className="border-r pt-16 md:pt-0">
            <SidebarHeader className={cn("flex items-center justify-center py-6 transition-all duration-300", state === "collapsed" ? "px-2" : "px-4")}>
                <Link href="/dashboard" className="flex items-center justify-center overflow-hidden w-full">
                    <div className={cn("relative transition-all duration-300", state === "collapsed" ? "size-10" : "size-20")}>
                        <Image src="/assets/logo.png" fill alt="Dubuy Logo" className="object-contain" />
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-3 py-4">
                <SidebarMenu className="gap-2">
                    {sidebarItems.map((item) => {
                        const isActive = item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href)

                        return (
                            <SidebarMenuItem key={item.href}>
                                <Tooltip>
                                    <TooltipTrigger render={
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            size="lg"
                                            render={<Link href={item.href} />}
                                            className={cn(
                                                "transition-all duration-200 flex items-center gap-4 px-3 group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center",
                                                isActive
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-semibold shadow-sm"
                                                    : "text-muted-foreground hover:text-primary hover:bg-sidebar-accent/50 font-medium"
                                            )}
                                        >
                                            <div className="size-6 relative shrink-0 flex items-center justify-center">
                                                <Image
                                                    src={item.icon}
                                                    fill
                                                    alt={item.title}
                                                    className={cn(
                                                        "object-contain transition-all",
                                                        isActive ? "brightness-0 invert" : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                                                    )}
                                                />
                                            </div>
                                            <span className="truncate text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                                        </SidebarMenuButton>
                                    } />
                                    <TooltipContent side="right" hidden={state !== "collapsed" || isMobile}>
                                        {item.title}
                                    </TooltipContent>
                                </Tooltip>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4 mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Tooltip>
                            <TooltipTrigger render={
                                <SidebarMenuButton
                                    className="text-muted-foreground hover:text-primary hover:bg-sidebar-accent/50 flex items-center gap-4 px-3 group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
                                    size="lg"
                                    render={<Link href="/dashboard/login" />}
                                >
                                    <div className="size-6 relative shrink-0 flex items-center justify-center">
                                        <Image
                                            src="/assets/dashboard-icons-svg/logout.svg"
                                            fill
                                            alt="Logout"
                                            className="object-contain grayscale opacity-70"
                                        />
                                    </div>
                                    <span className="truncate font-medium text-sm group-data-[collapsible=icon]:hidden">Logout</span>
                                </SidebarMenuButton>
                            } />
                            <TooltipContent side="right" hidden={state !== "collapsed" || isMobile}>
                                Logout
                            </TooltipContent>
                        </Tooltip>
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
            <SidebarInset className="bg-muted/10">
                <header className="sticky top-0 z-10 flex h-20 items-center gap-4 bg-background px-6 shadow-sm/50">
                    <SidebarTrigger className="-ml-2 h-10 w-10 text-muted-foreground hover:bg-muted hover:text-primary transition-colors" />
                    <div className="flex flex-col ml-2">
                        <h1 className="text-xl font-bold text-foreground">Welcome, Dino</h1>
                        <p className="text-sm text-muted-foreground font-medium">Have a nice day!</p>
                    </div>
                    <div className="ml-auto flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-full bg-muted/30 hover:bg-muted/80 transition-colors">
                            <HugeiconsIcon icon={Notification01Icon} size={22} className="text-foreground/80 stroke-2" />
                            <span className="absolute top-2.5 right-3 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background animate-pulse" />
                            <span className="sr-only">Notifications</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <Button variant="outline" className="h-12 gap-3 rounded-full border px-2 py-1 pl-5 hover:bg-muted/30 transition-all group">
                                    <span className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">Dino</span>
                                    <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-background shadow-sm">
                                        <Image
                                            src="/assets/logo.png" // Placeholder or user avatar
                                            fill
                                            alt="User Avatar"
                                            className="object-cover bg-muted/50"
                                        />
                                    </div>
                                </Button>
                            } />
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
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
                <main className="flex-1 space-y-4 p-8 pt-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
