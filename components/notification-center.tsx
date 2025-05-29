"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, MessageSquare, AlertTriangle, CheckCircle, Clock, X } from "lucide-react"

interface Notification {
  id: string
  type: "evaluation" | "feedback" | "meeting" | "deadline" | "system"
  title: string
  message: string
  date: string
  read: boolean
  priority: "high" | "medium" | "low"
  actionRequired?: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "evaluation",
    title: "Quarterly Evaluation Due",
    message: "Your quarterly performance evaluation is due in 3 days",
    date: "2024-01-15",
    read: false,
    priority: "high",
    actionRequired: true,
  },
  {
    id: "2",
    type: "feedback",
    title: "New Feedback Received",
    message: "You have received positive feedback from your supervisor",
    date: "2024-01-14",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "meeting",
    title: "Performance Review Meeting",
    message: "Scheduled for tomorrow at 2:00 PM with Jane Smith",
    date: "2024-01-13",
    read: true,
    priority: "high",
    actionRequired: true,
  },
  {
    id: "4",
    type: "deadline",
    title: "PDP Goal Deadline Approaching",
    message: "Your React certification goal is due next week",
    date: "2024-01-12",
    read: false,
    priority: "medium",
    actionRequired: true,
  },
  {
    id: "5",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance on Sunday from 2-4 AM",
    date: "2024-01-11",
    read: true,
    priority: "low",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread" | "action">("all")

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    switch (filter) {
      case "unread":
        return !notif.read
      case "action":
        return notif.actionRequired
      default:
        return true
    }
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "evaluation":
        return <CheckCircle className="h-4 w-4" />
      case "feedback":
        return <MessageSquare className="h-4 w-4" />
      case "meeting":
        return <Calendar className="h-4 w-4" />
      case "deadline":
        return <Clock className="h-4 w-4" />
      case "system":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Center
                {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
              </CardTitle>
              <CardDescription>Stay updated with performance management activities</CardDescription>
            </div>
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark All Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(value: "all" | "unread" | "action") => setFilter(value)}>
            <TabsList>
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="action">Action Required ({actionRequiredCount})</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-4 mt-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <Card key={notification.id} className={`${!notification.read ? "border-blue-200 bg-blue-50" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`mt-1 ${getPriorityColor(notification.priority)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                {notification.actionRequired && (
                                  <Badge variant="destructive" className="text-xs">
                                    Action Required
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {notification.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">{notification.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Mark Read
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-muted-foreground">Browser push notifications</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Reminder Frequency</h4>
              <p className="text-sm text-muted-foreground">How often to remind about pending tasks</p>
            </div>
            <Button variant="outline">Daily</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
