"use client"

import { Bell, CheckCircle2, FileText, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: "1",
    type: "report",
    title: "Report ready",
    description: "Lab results for Sarah Connor are ready for review.",
    time: "2 min ago",
    unread: true,
    icon: FileText,
  },
  {
    id: "2",
    type: "patient",
    title: "New patient assigned",
    description: "Michael Brown has been assigned to your care team.",
    time: "1 hour ago",
    unread: true,
    icon: Users,
  },
  {
    id: "3",
    type: "schedule",
    title: "Upcoming appointment",
    description: "Consultation with Emily Davis at 2:00 PM today.",
    time: "3 hours ago",
    unread: false,
    icon: Calendar,
  },
  {
    id: "4",
    type: "report",
    title: "Report signed",
    description: "General checkup note for John Smith has been signed.",
    time: "Yesterday",
    unread: false,
    icon: CheckCircle2,
  },
]

export function NotificationDropdown() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[380px] p-0 rounded-xl border border-border/60 bg-background shadow-xl"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground h-7"
            >
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[320px]">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Bell className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're all caught up.
                </p>
              </div>
            ) : (
              <ul className="space-y-0.5">
                {notifications.map((item) => {
                  const Icon = item.icon
                  return (
                    <li
                      key={item.id}
                      className={cn(
                        "flex gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors",
                        item.unread
                          ? "bg-primary/5 hover:bg-primary/10"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className="h-9 w-9 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm truncate",
                            item.unread ? "font-medium text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {item.description}
                        </p>
                        <p className="text-[11px] text-muted-foreground/80 mt-1">
                          {item.time}
                        </p>
                      </div>
                      {item.unread && (
                        <span className="shrink-0 mt-2 w-2 h-2 rounded-full bg-primary" />
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </ScrollArea>
        <div className="border-t border-border/40 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground hover:text-foreground"
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
