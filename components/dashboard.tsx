"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  Target,
  MessageSquare,
  BarChart3,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  Plus,
} from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useAuth } from "@/components/auth-provider"
import { PDPForm } from "@/components/pdp-form"
import { EvaluationForm } from "@/components/evaluation-form"
import { FeedbackForm } from "@/components/feedback-form"
import { ReportsDashboard } from "@/components/reports-dashboard"
import { UserManagement } from "@/components/user-management"
import { NotificationCenter } from "@/components/notification-center"

// Mock data for dashboard
const dashboardData = {
  employee: {
    currentPDP: {
      title: "Q4 2024 Development Plan",
      progress: 75,
      goals: 4,
      completedGoals: 3,
    },
    recentFeedback: [
      { id: 1, type: "positive", message: "Excellent work on the API integration", date: "2024-01-15" },
      { id: 2, type: "constructive", message: "Consider improving documentation practices", date: "2024-01-10" },
    ],
    upcomingEvaluation: {
      date: "2024-02-15",
      type: "Quarterly Review",
    },
  },
  supervisor: {
    teamMembers: 8,
    pendingEvaluations: 3,
    feedbackGiven: 12,
    teamPerformance: 85,
  },
  admin: {
    totalEmployees: 150,
    completedEvaluations: 120,
    pendingEvaluations: 30,
    systemHealth: 98,
  },
}

export function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [activeView, setActiveView] = useState("dashboard")

  if (!user) return null

  const renderEmployeeDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current PDP Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.employee.currentPDP.progress}%</div>
            <Progress value={dashboardData.employee.currentPDP.progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {dashboardData.employee.currentPDP.completedGoals} of {dashboardData.employee.currentPDP.goals} goals
              completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.employee.recentFeedback.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Evaluation</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 15</div>
            <p className="text-xs text-muted-foreground">{dashboardData.employee.upcomingEvaluation.type}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground">Last evaluation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest feedback from your supervisor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.employee.recentFeedback.map((feedback) => (
              <div key={feedback.id} className="flex items-start space-x-3">
                <Badge variant={feedback.type === "positive" ? "default" : "secondary"}>{feedback.type}</Badge>
                <div className="flex-1">
                  <p className="text-sm">{feedback.message}</p>
                  <p className="text-xs text-muted-foreground">{feedback.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Development Goals</CardTitle>
            <CardDescription>Your active performance development plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Complete React certification</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Lead team standup meetings</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Improve code documentation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Mentor junior developer</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <Button onClick={() => setActiveView("pdp")}>
          <Target className="h-4 w-4 mr-2" />
          View My PDP
        </Button>
        <Button variant="outline" onClick={() => setActiveView("feedback")}>
          <MessageSquare className="h-4 w-4 mr-2" />
          View Feedback History
        </Button>
      </div>
    </div>
  )

  const renderSupervisorDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.supervisor.teamMembers}</div>
            <p className="text-xs text-muted-foreground">Direct reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.supervisor.pendingEvaluations}</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Given</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.supervisor.feedbackGiven}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.supervisor.teamPerformance}%</div>
            <p className="text-xs text-muted-foreground">Average score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
            <CardDescription>Recent team member evaluations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Alice Johnson", score: 4.5, status: "completed" },
              { name: "Bob Smith", score: 4.2, status: "completed" },
              { name: "Carol Davis", score: null, status: "pending" },
              { name: "David Wilson", score: 4.8, status: "completed" },
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{member.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {member.status === "completed" ? (
                    <Badge variant="default">{member.score}/5</Badge>
                  ) : (
                    <Badge variant="secondary">Pending</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Performance management activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Quarterly review - Alice Johnson</p>
                <p className="text-xs text-muted-foreground">Due: Feb 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Feedback session - Bob Smith</p>
                <p className="text-xs text-muted-foreground">Scheduled: Feb 12, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">PDP review - Carol Davis</p>
                <p className="text-xs text-muted-foreground">Due: Feb 20, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <Button onClick={() => setActiveView("evaluation")}>
          <FileText className="h-4 w-4 mr-2" />
          Start Evaluation
        </Button>
        <Button variant="outline" onClick={() => setActiveView("feedback")}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Give Feedback
        </Button>
        <Button variant="outline" onClick={() => setActiveView("pdp")}>
          <Target className="h-4 w-4 mr-2" />
          Create PDP
        </Button>
      </div>
    </div>
  )

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.admin.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Evaluations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.admin.completedEvaluations}</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.admin.pendingEvaluations}</div>
            <p className="text-xs text-muted-foreground">Overdue: 5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.admin.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average performance scores by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { dept: "Engineering", score: 4.3, employees: 45 },
              { dept: "Sales", score: 4.1, employees: 32 },
              { dept: "Marketing", score: 4.5, employees: 28 },
              { dept: "HR", score: 4.2, employees: 15 },
            ].map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{dept.dept}</p>
                  <p className="text-xs text-muted-foreground">{dept.employees} employees</p>
                </div>
                <Badge variant="default">{dept.score}/5</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Recent performance management activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm">15 evaluations completed today</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm">3 new employees added</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Settings className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm">Performance categories updated</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <Button onClick={() => setActiveView("users")}>
          <Users className="h-4 w-4 mr-2" />
          Manage Users
        </Button>
        <Button variant="outline" onClick={() => setActiveView("reports")}>
          <BarChart3 className="h-4 w-4 mr-2" />
          View Reports
        </Button>
        <Button variant="outline" onClick={() => setActiveView("settings")}>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeView) {
      case "pdp":
        return <PDPForm />
      case "evaluation":
        return <EvaluationForm />
      case "feedback":
        return <FeedbackForm />
      case "reports":
        return <ReportsDashboard />
      case "users":
        return <UserManagement />
      case "notifications":
        return <NotificationCenter />
      default:
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="coaching">Coaching</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {user.role === "employee" && renderEmployeeDashboard()}
              {user.role === "supervisor" && renderSupervisorDashboard()}
              {user.role === "admin" && renderAdminDashboard()}
            </TabsContent>

            <TabsContent value="planning" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Development Planning</CardTitle>
                  <CardDescription>Create and manage development plans for performance improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button onClick={() => setActiveView("pdp")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New PDP
                    </Button>
                    <Button variant="outline">View Active Plans</Button>
                    <Button variant="outline">Plan Templates</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coaching" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Coaching & Feedback</CardTitle>
                  <CardDescription>Provide ongoing feedback and coaching to team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button onClick={() => setActiveView("feedback")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Give Feedback
                    </Button>
                    <Button variant="outline">View Feedback History</Button>
                    <Button variant="outline">Schedule Coaching Session</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Evaluation</CardTitle>
                  <CardDescription>Conduct formal performance evaluations and reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button onClick={() => setActiveView("evaluation")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Start Evaluation
                    </Button>
                    <Button variant="outline">View Evaluations</Button>
                    <Button variant="outline">Evaluation Templates</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>Generate performance reports and analyze trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button onClick={() => setActiveView("reports")}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                    <Button variant="outline">Performance Analytics</Button>
                    <Button variant="outline">Export Data</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setActiveView} />
      <main className="flex-1">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold">Performance Management System</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{user.role}</Badge>
            <Badge variant="secondary">{user.department}</Badge>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="p-6">{renderContent()}</div>
      </main>
    </SidebarProvider>
  )
}
