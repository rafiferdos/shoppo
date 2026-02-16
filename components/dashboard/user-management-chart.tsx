"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const data = [
    { name: "Jan", users: 30, total: 50 },
    { name: "Feb", users: 15, total: 50 },
    { name: "Mar", users: 38, total: 50 },
    { name: "Apr", users: 32, total: 50 },
    { name: "May", users: 37, total: 50 },
    { name: "Jun", users: 18, total: 50 },
    { name: "Jul", users: 36, total: 50 },
    { name: "Aug", users: 14, total: 50 },
    { name: "Sep", users: 36, total: 50 },
    { name: "Oct", users: 19, total: 50 },
    { name: "Nov", users: 35, total: 50 },
    { name: "Dec", users: 18, total: 50 },
]

export function UserManagementChart() {
    const [selectedYear, setSelectedYear] = useState("2025")

    return (
        <Card className="col-span-4 shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <CardTitle className="text-xl font-semibold">User Management</CardTitle>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-background text-foreground font-normal px-3 py-1">
                        user
                    </Badge>
                    <Select value={selectedYear} onValueChange={(value) => value && setSelectedYear(value)}>
                        <SelectTrigger className="w-25 h-9">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={data} barGap={-28}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e5e7eb"
                        />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 50]}
                            ticks={[0, 15, 35, 50]}
                        />
                        <Bar
                            dataKey="total"
                            fill="#ebf6f0"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                        <Bar
                            dataKey="users"
                            fill="#16a34a"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
