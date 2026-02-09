
import { StatsCard } from "@/components/dashboard/stats-card"
import { Users, Calendar, Activity, Clock, MoreHorizontal, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Welcome back, Dr. Richardson</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="rounded-xl shadow-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        New Appointment
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Patients"
                    value="1,284"
                    icon={Users}
                    trend="up"
                    trendValue="12%"
                    description="from last month"
                />
                <StatsCard
                    title="Appointments Today"
                    value="12"
                    icon={Calendar}
                    description="4 remaining"
                />
                <StatsCard
                    title="Pending Reports"
                    value="7"
                    icon={Activity}
                    trend="down"
                    trendValue="2%"
                    description="processing time"
                />
                <StatsCard
                    title="Avg. Consult Time"
                    value="14 min"
                    icon={Clock}
                    trend="neutral"
                    description="consistent"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">

                {/* Patient Queue / Recent Patients */}
                <div className="col-span-4 rounded-3xl border border-border/40 bg-background/60 backdrop-blur-sm shadow-sm p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Upcoming Appointments</h3>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            View all
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/40">
                                <TableHead className="w-[100px]">Time</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { time: "09:30 AM", name: "Sarah Connor", type: "Follow-up", status: "In Progress" },
                                { time: "10:00 AM", name: "John Smith", type: "General Checkup", status: "Waiting" },
                                { time: "10:45 AM", name: "Emily Davis", type: "Consultation", status: "Confirmed" },
                                { time: "11:30 AM", name: "Michael Brown", type: "Report Review", status: "Confirmed" },
                            ].map((patient, i) => (
                                <TableRow key={i} className="hover:bg-muted/30 border-border/40 group">
                                    <TableCell className="font-medium">{patient.time}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{patient.name}</span>
                                            <span className="text-xs text-muted-foreground">ID: #429{i}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{patient.type}</TableCell>
                                    <TableCell className="text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${patient.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                                            {patient.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Recent Activity / Tasks */}
                <div className="col-span-3 rounded-3xl border border-border/40 bg-background/60 backdrop-blur-sm shadow-sm p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Recent Reports</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: "Blood Work Analysis", patient: "James Wilson", time: "2h ago", status: "Ready" },
                            { title: "MRI Scan Results", patient: "Linda Martinez", time: "4h ago", status: "Dr. Review" },
                            { title: "Cardiology Report", patient: "Robert Taylor", time: "5h ago", status: "Sent" },
                            { title: "General Checkup Note", patient: "William Lee", time: "Yesterday", status: "Sent" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/40 group cursor-pointer leading-none">
                                <div className="space-y-1">
                                    <p className="font-medium text-sm">{item.title}</p>
                                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                                        <span>{item.patient}</span>
                                        <span>•</span>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="w-full rounded-xl" size="sm">
                        View all reports
                    </Button>
                </div>
            </div>
        </div>
    )
}
