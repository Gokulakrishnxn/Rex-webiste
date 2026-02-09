
"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, MapPin, MoreVertical, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

export default function SchedulePage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const appointments = [
        {
            id: 1,
            patient: "Sarah Connor",
            time: "09:30 AM",
            duration: "30 min",
            type: "Follow-up",
            status: "Upcoming",
            image: "/avatars/01.png"
        },
        {
            id: 2,
            patient: "John Smith",
            time: "10:30 AM",
            duration: "45 min",
            type: "General Checkup",
            status: "upcoming",
            image: "/avatars/02.png"
        },
        {
            id: 3,
            patient: "Emily Davis",
            time: "02:00 PM",
            duration: "1 hour",
            type: "Consultation",
            status: "Confirmed",
            image: "/avatars/03.png"
        },
        {
            id: 4,
            patient: "Michael Brown",
            time: "04:15 PM",
            duration: "30 min",
            type: "Report Review",
            status: "Confirmed",
            image: "/avatars/04.png"
        }
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-bold tracking-tight">Schedule</h2>
                    <p className="text-muted-foreground">Manage your appointments and availability</p>
                </div>
                <Button className="rounded-xl shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                {/* Calendar Section */}
                <Card className="lg:col-span-3 rounded-3xl border-border/40 bg-background/60 backdrop-blur-sm shadow-sm h-fit">
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                        <CardDescription>Select a date to view appointments</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-xl border border-border/40 shadow-sm p-4 w-full"
                        />
                    </CardContent>
                </Card>

                {/* Appointments List Section */}
                <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        Upcoming Appointments
                        <span className="ml-2 text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                            {date?.toDateString()}
                        </span>
                    </h3>

                    <div className="space-y-3">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="group flex items-center gap-4 p-4 rounded-2xl bg-background/60 hover:bg-muted/40 border border-border/40 transition-all shadow-sm hover:shadow-md cursor-pointer">
                                <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-primary/5 text-primary">
                                    <span className="text-sm font-bold">{apt.time.split(' ')[0]}</span>
                                    <span className="text-[10px] uppercase font-medium mt-0.5">{apt.time.split(' ')[1]}</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold truncate">{apt.type}</h4>
                                        <Badge variant="secondary" className="rounded-full text-[10px] font-normal px-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                            {apt.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 border border-border/50">
                                            <AvatarImage src={apt.image} />
                                            <AvatarFallback className="text-[10px]">{apt.patient.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-sm text-muted-foreground truncate">
                                            with <span className="font-medium text-foreground">{apt.patient}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {apt.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> Room 302
                                        </span>
                                    </div>
                                </div>

                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full rounded-xl border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 h-12">
                            <Plus className="mr-2 h-4 w-4" /> Add time slot
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
