"use client"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button, buttonVariants } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Notification01Icon,
    MoneyBag02Icon,
    PackageIcon,
    AlertCircleIcon
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { NotificationsSkeleton } from "./notifications-skeleton"

interface Notification {
    id: string
    title: string
    message: string
    time: string
    read: boolean
    type: 'payment' | 'order' | 'system'
}

const initialNotifications: Notification[] = [
    {
        id: '1',
        title: 'Payment Received',
        message: 'You received a payment of $1,200.00 from Ali Ahmed.',
        time: '2m ago',
        read: false,
        type: 'payment'
    },
    {
        id: '2',
        title: 'New Order',
        message: 'Order #ORD-2024-001 has been placed.',
        time: '1h ago',
        read: false,
        type: 'order'
    },
    {
        id: '3',
        title: 'System Update',
        message: 'The system will be under maintenance tonight at 2 AM.',
        time: '5h ago',
        read: true,
        type: 'system'
    },
    {
        id: '4',
        title: 'Payment Overdue',
        message: 'Invoice #INV-003 is overdue by 2 days.',
        time: '1d ago',
        read: true,
        type: 'payment'
    }
]

export function NotificationsPopover() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Simulate API fetch - replace with actual API call
        const timer = setTimeout(() => {
            setNotifications(initialNotifications)
            setIsLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    const unreadCount = notifications.filter(n => !n.read).length

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ))
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "relative h-9 w-9 rounded-full hover:bg-muted transition-colors"
            )}>
                <HugeiconsIcon icon={Notification01Icon} size={20} className="text-muted-foreground" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background animate-pulse" />
                )}
                <span className="sr-only">Notifications</span>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 shadow-lg border-border/40" align="end" sideOffset={8}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/30">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    {!isLoading && unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-primary hover:text-primary/80 hover:bg-transparent font-medium"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <div className="max-h-100 overflow-y-auto">
                    {isLoading ? (
                        <NotificationsSkeleton />
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                            No notifications
                        </div>
                    ) : (
                        <div className="divide-y divide-border/20">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 hover:bg-muted/50 transition-colors cursor-pointer relative group",
                                        !notification.read && "bg-primary/5"
                                    )}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex gap-3 items-start">
                                        <div className={cn(
                                            "mt-1 p-2 rounded-full shrink-0",
                                            notification.type === 'payment' && "bg-blue-100 text-blue-600",
                                            notification.type === 'order' && "bg-primary/10 text-primary",
                                            notification.type === 'system' && "bg-orange-100 text-orange-600",
                                        )}>
                                            {notification.type === 'payment' && <HugeiconsIcon icon={MoneyBag02Icon} size={16} />}
                                            {notification.type === 'order' && <HugeiconsIcon icon={PackageIcon} size={16} />}
                                            {notification.type === 'system' && <HugeiconsIcon icon={AlertCircleIcon} size={16} />}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <p className={cn("text-sm font-medium leading-none", !notification.read && "text-foreground")}>
                                                    {notification.title}
                                                </p>
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{notification.time}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {notification.message}
                                            </p>
                                        </div>
                                    </div>
                                    {!notification.read && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" title="Mark as read" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-2 border-t border-border/40 bg-muted/30">
                    <Button variant="ghost" size="sm" className="w-full text-xs h-8 text-muted-foreground hover:text-foreground">
                        View all notifications
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
