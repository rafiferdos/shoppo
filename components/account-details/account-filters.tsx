"use client"

import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Calendar02Icon } from "@hugeicons/core-free-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface AccountFiltersProps {
    searchTerm: string
    onSearchChange: (val: string) => void
    date: Date | undefined
    onDateChange: (val: Date | undefined) => void
}

export function AccountFilters({ searchTerm, onSearchChange, date, onDateChange }: AccountFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-1/2">
                <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search here...."
                    className="pl-10 h-12 bg-muted/30 border-input"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="w-full md:w-1/2">
                <Popover>
                    <PopoverTrigger className={cn(
                        "w-full h-12 flex items-center justify-between text-left font-normal bg-muted/30 border-input px-4 rounded-md border hover:bg-muted/50",
                        !date && "text-muted-foreground"
                    )}>
                        <div className="flex items-center gap-2">
                            {date ? format(date, "PPP") : <span>Calendar</span>}
                        </div>
                        <HugeiconsIcon icon={Calendar02Icon} className="h-5 w-5 opacity-50" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={onDateChange}
                            captionLayout="dropdown"
                            fromYear={2020}
                            toYear={2030}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
