
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string
    description?: string
    icon: LucideIcon
    trend?: "up" | "down" | "neutral"
    trendValue?: string
}

export function StatsCard({ title, value, description, icon: Icon, trend, trendValue }: StatsCardProps) {
    return (
        <Card className="rounded-3xl border-border/40 shadow-sm bg-background/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-serif">{value}</div>
                {(description || trendValue) && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        {trend === "up" && <span className="text-green-500 font-medium">↑ {trendValue}</span>}
                        {trend === "down" && <span className="text-red-500 font-medium">↓ {trendValue}</span>}
                        <span>{description}</span>
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
