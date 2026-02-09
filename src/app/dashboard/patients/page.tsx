"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { Users, UserPlus, AlertCircle, Search, Filter, MoreHorizontal, FileEdit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const patients = [
    { id: "MX-9281", name: "Sarah Connor", email: "sarah.c@example.com", age: 45, gender: "Female", lastVisit: "Oct 24, 2024", status: "Active", image: "/avatars/01.png" },
    { id: "MX-9282", name: "John Smith", email: "john.smith@example.com", age: 52, gender: "Male", lastVisit: "Oct 22, 2024", status: "Active", image: "/avatars/02.png" },
    { id: "MX-9283", name: "Emily Davis", email: "emily.d@example.com", age: 28, gender: "Female", lastVisit: "Oct 20, 2024", status: "Inactive", image: "/avatars/03.png" },
    { id: "MX-9284", name: "Michael Brown", email: "m.brown@example.com", age: 61, gender: "Male", lastVisit: "Oct 19, 2024", status: "Critical", image: "/avatars/04.png" },
    { id: "MX-9285", name: "Jessica Wilson", email: "jess.w@example.com", age: 34, gender: "Female", lastVisit: "Oct 18, 2024", status: "Active", image: "/avatars/05.png" },
    { id: "MX-9286", name: "David Miller", email: "david.m@example.com", age: 49, gender: "Male", lastVisit: "Oct 15, 2024", status: "Active", image: "/avatars/06.png" },
    { id: "MX-9287", name: "Robert Taylor", email: "robert.t@example.com", age: 72, gender: "Male", lastVisit: "Oct 12, 2024", status: "Critical", image: "/avatars/07.png" },
]


import { AddPatientModal } from "@/components/dashboard/add-patient-modal"
import { PatientProfileModal } from "@/components/dashboard/patient-profile-modal" // Import
import { useState } from "react" // Import

// ... imports

export default function PatientsPage() {
    const [selectedPatient, setSelectedPatient] = useState<any>(null)
    const [patientProfileOpen, setPatientProfileOpen] = useState(false)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-bold tracking-tight">Patients</h2>
                    <p className="text-muted-foreground">Manage and view patient records</p>
                </div>
                <div className="flex items-center gap-2">
                    <AddPatientModal>
                        <Button className="rounded-xl shadow-sm">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Patient
                        </Button>
                    </AddPatientModal>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Total Patients"
                    value="1,284"
                    icon={Users}
                    trend="up"
                    trendValue="12%"
                    description="from last month"
                />
                <StatsCard
                    title="New Patients"
                    value="48"
                    icon={UserPlus}
                    trend="up"
                    trendValue="4%"
                    description="this month"
                />
                <StatsCard
                    title="Critical Attention"
                    value="12"
                    icon={AlertCircle}
                    trend="down"
                    trendValue="2"
                    description="requires immediate review"
                />
            </div>

            {/* Filters and Search */}
            <div className="flex items-center justify-between gap-4 bg-background/60 backdrop-blur-sm p-4 rounded-2xl border border-border/40 shadow-sm">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name, email, or ID..."
                        className="pl-9 h-9 bg-background/50 border-border/50 focus-visible:bg-background transition-all rounded-xl"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 rounded-xl gap-2">
                                <Filter className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Active</DropdownMenuItem>
                            <DropdownMenuItem>Inactive</DropdownMenuItem>
                            <DropdownMenuItem>Critical</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Patients Table */}
            <div className="rounded-3xl border border-border/40 bg-background/60 backdrop-blur-sm shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/40 bg-muted/20">
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead className="hidden md:table-cell">Details</TableHead>
                            <TableHead className="hidden md:table-cell">Last Visit</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow
                                key={patient.id}
                                className="hover:bg-muted/30 border-border/40 group transition-colors cursor-pointer"
                                onClick={() => {
                                    setSelectedPatient(patient)
                                    setPatientProfileOpen(true)
                                }}
                            >
                                <TableCell className="font-medium text-xs text-muted-foreground">{patient.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-border/50">
                                            <AvatarImage src={patient.image} alt={patient.name} />
                                            <AvatarFallback className="bg-primary/5 text-primary text-xs">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{patient.name}</span>
                                            <span className="text-xs text-muted-foreground">{patient.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{patient.age} yrs</span>
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <span>{patient.gender}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{patient.lastVisit}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0
                                            ${patient.status === 'Active' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                                                patient.status === 'Critical' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
                                                    'bg-zinc-500/10 text-zinc-700 dark:text-zinc-400'}`}
                                    >
                                        {patient.status}
                                    </Badge>
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted rounded-full">
                                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                            <DropdownMenuItem onClick={() => {
                                                setSelectedPatient(patient)
                                                setPatientProfileOpen(true)
                                            }}>
                                                <UserPlus className="mr-2 h-4 w-4" /> View Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <FileEdit className="mr-2 h-4 w-4" /> Edit Details
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PatientProfileModal
                patient={selectedPatient}
                open={patientProfileOpen}
                onOpenChange={setPatientProfileOpen}
            />
        </div>
    )
}
