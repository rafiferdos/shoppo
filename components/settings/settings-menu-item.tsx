"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

interface SettingsMenuItemProps {
    title: string
    href?: string
    onClick?: () => void
}

export function SettingsMenuItem({ title, href, onClick }: SettingsMenuItemProps) {
    const content = (
        <div className="bg-white rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/20 cursor-pointer">
            <span className="font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-300">{title}</span>
            <div className="bg-muted/50 p-2 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
        </div>
    )

    if (onClick) {
        return (
            <button type="button" onClick={onClick} className="block w-full text-left group">
                {content}
            </button>
        )
    }

    return (
        <Link href={href || "#"} className="block group">
            {content}
        </Link>
    )
}
