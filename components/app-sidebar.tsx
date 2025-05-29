"use client"

import {
  Calendar,
  Users,
  Target,
  MessageSquare,
  BarChart3,
  FileText,
  Settings,
  Home,
  ClipboardList,
  TrendingUp,
  UserCheck,
  Bell,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"

interface AppSidebarProps {
  onNavigate: (view: string) => void
}

// Menu items based on user role
const menuItems = {
  employee: [
    {
      title: "Dashboard",
      view: "dashboard",
      icon: Home,
    },
    {
      title: "My Development Plan",
      view: "pdp",
      icon: Target,
    },
    {
      title: "Feedback History",
      view: "feedback",
      icon: MessageSquare,
    },
    {
      title: "My Evaluations",
      view: "evaluation",
      icon: ClipboardList,
    },
    {
      title: "Goals & Objectives",
      view: "goals",
      icon: TrendingUp,
    },
  ],
  supervisor: [
    {
      title: "Dashboard",
      view: "dashboard",
      icon: Home,
    },
    {
      title: "Team Management",
      view: "team",
      icon: Users,
    },
    {
      title: "Development Plans",
      view: "pdp",
      icon: Target,
    },
    {
      title: "Coaching & Feedback",
      view: "feedback",
      icon: MessageSquare,
    },
    {
      title: "Evaluations",
      view: "evaluation",
      icon: ClipboardList,
    },
    {
      title: "Team Reports",
      view: "reports",
      icon: BarChart3,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      view: "dashboard",
      icon: Home,
    },
    {
      title: "User Management",
      view: "users",
      icon: Users,
    },
    {
      title: "System Settings",
      view: "settings",
      icon: Settings,
    },
    {
      title: "Performance Categories",
      view: "categories",
      icon: ClipboardList,
    },
    {
      title: "Organization Reports",
      view: "reports",
      icon: BarChart3,
    },
    {
      title: "Audit Logs",
      view: "audit",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const { user } = useAuth()

  if (!user) return null

  const items = menuItems[user.role] || menuItems.employee

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center space-x-2 px-2 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <UserCheck className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">PMS</h2>
            <p className="text-xs text-muted-foreground">Performance Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => onNavigate(item.view)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onNavigate("notifications")}>
                  <Bell />
                  <span>Notifications</span>
                  <Badge variant="destructive" className="ml-auto">
                    3
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onNavigate("calendar")}>
                  <Calendar />
                  <span>Schedule Review</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.department}</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
