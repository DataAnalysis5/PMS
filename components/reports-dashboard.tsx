"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Target, Download, Calendar, Filter, FileText } from "lucide-react"

// Mock data for reports
const reportData = {
  performanceTrends: [
    { month: "Jan", avgScore: 4.2, evaluations: 45 },
    { month: "Feb", avgScore: 4.3, evaluations: 48 },
    { month: "Mar", avgScore: 4.1, evaluations: 52 },
    { month: "Apr", avgScore: 4.4, evaluations: 47 },
  ],
  departmentPerformance: [
    { department: "Engineering", avgScore: 4.3, employees: 45, completed: 42 },
    { department: "Sales", avgScore: 4.1, employees: 32, completed: 30 },
    { department: "Marketing", avgScore: 4.5, employees: 28, completed: 28 },
    { department: "HR", avgScore: 4.2, employees: 15, completed: 15 },
    { department: "Finance", avgScore: 4.0, employees: 20, completed: 18 },
  ],
  evaluationCategories: [
    { category: "Job Knowledge", avgScore: 4.3 },
    { category: "Communication", avgScore: 4.1 },
    { category: "Collaboration", avgScore: 4.4 },
    { category: "Accountability", avgScore: 4.2 },
    { category: "Adaptability", avgScore: 4.0 },
  ],
  goalAchievement: {
    completed: 78,
    inProgress: 45,
    overdue: 12,
    total: 135,
  },
}

export function ReportsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("q1-2024")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const exportReport = (format: "pdf" | "csv") => {
    // Simulate export functionality
    const fileName = `performance_report_${selectedPeriod}.${format}`

    if (format === "csv") {
      // Create CSV content
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Department,Average Score,Employees,Completed\n" +
        reportData.departmentPerformance
          .map((dept) => `${dept.department},${dept.avgScore},${dept.employees},${dept.completed}`)
          .join("\n")

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // For PDF, show alert (in real app would generate PDF)
      alert(`PDF report "${fileName}" would be generated and downloaded`)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Reports & Analytics</CardTitle>
          <CardDescription>Comprehensive performance insights and trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                  <SelectItem value="annual-2024">Annual 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 ml-auto">
              <Button variant="outline" onClick={() => exportReport("csv")}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={() => exportReport("pdf")}>
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
          <TabsTrigger value="goals">Goal Achievement</TabsTrigger>
          <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Evaluations</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">192</div>
                <p className="text-xs text-muted-foreground">+12% from last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2/5</div>
                <p className="text-xs text-muted-foreground">+0.1 from last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">On-time evaluations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Development goals met</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>Employee performance ratings distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { rating: "Outstanding (5-6)", count: 45, percentage: 23 },
                  { rating: "Effective (4-5)", count: 89, percentage: 46 },
                  { rating: "Standard (3-4)", count: 48, percentage: 25 },
                  { rating: "Developing (1-3)", count: 10, percentage: 6 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.rating}</span>
                      <span>
                        {item.count} employees ({item.percentage}%)
                      </span>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Departments</CardTitle>
                <CardDescription>Departments by average performance score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportData.departmentPerformance
                  .sort((a, b) => b.avgScore - a.avgScore)
                  .slice(0, 5)
                  .map((dept, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">
                          {dept.completed}/{dept.employees} evaluations completed
                        </p>
                      </div>
                      <Badge variant="default">{dept.avgScore}/5</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Monthly performance score trends and evaluation volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.performanceTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{trend.month} 2024</p>
                      <p className="text-sm text-muted-foreground">{trend.evaluations} evaluations</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{trend.avgScore}/5</p>
                      <Badge variant={trend.avgScore >= 4.3 ? "default" : "secondary"}>
                        {trend.avgScore >= 4.3 ? "Above Average" : "Average"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Analysis</CardTitle>
              <CardDescription>Detailed breakdown by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.departmentPerformance.map((dept, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-lg">{dept.department}</h4>
                      <Badge variant="default">{dept.avgScore}/5</Badge>
                    </div>
                    <div className="grid gap-2 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Employees</p>
                        <p className="font-medium">{dept.employees}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed Evaluations</p>
                        <p className="font-medium">{dept.completed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                        <p className="font-medium">{Math.round((dept.completed / dept.employees) * 100)}%</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={(dept.completed / dept.employees) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goal Achievement Analysis</CardTitle>
              <CardDescription>Development goal completion status across the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{reportData.goalAchievement.completed}</div>
                  <p className="text-sm text-muted-foreground">Completed Goals</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{reportData.goalAchievement.inProgress}</div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{reportData.goalAchievement.overdue}</div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{reportData.goalAchievement.total}</div>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Goal Completion Rate</span>
                  <span>
                    {Math.round((reportData.goalAchievement.completed / reportData.goalAchievement.total) * 100)}%
                  </span>
                </div>
                <Progress value={(reportData.goalAchievement.completed / reportData.goalAchievement.total) * 100} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Category Breakdown</CardTitle>
              <CardDescription>Average scores across different performance categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.evaluationCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{category.category}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32">
                        <Progress value={(category.avgScore / 5) * 100} />
                      </div>
                      <Badge variant="default">{category.avgScore}/5</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
