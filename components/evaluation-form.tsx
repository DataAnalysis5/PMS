"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Performance categories based on KISNA guide
const performanceCategories = [
  {
    id: "job-knowledge",
    name: "Job Knowledge",
    description: "Understanding of job requirements, technical skills, and industry knowledge",
  },
  {
    id: "accountability",
    name: "Accountability",
    description: "Takes responsibility for actions, decisions, and results",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Effective verbal and written communication skills",
  },
  {
    id: "motivation",
    name: "Motivation",
    description: "Self-driven, enthusiastic, and committed to excellence",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description: "Works effectively with others and contributes to team success",
  },
  {
    id: "service-orientation",
    name: "Service Orientation",
    description: "Focus on customer satisfaction and service quality",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    description: "Flexibility and ability to adapt to changing circumstances",
  },
  {
    id: "inclusion",
    name: "Inclusion",
    description: "Promotes diversity, equity, and inclusive practices",
  },
  {
    id: "self-development",
    name: "Self-Development",
    description: "Commitment to continuous learning and personal growth",
  },
]

// Additional categories for supervisors
const supervisorCategories = [
  {
    id: "coaching",
    name: "Coaching",
    description: "Ability to develop and guide team members",
  },
  {
    id: "leadership",
    name: "Leadership",
    description: "Inspiring and directing others toward common goals",
  },
  {
    id: "performance-management",
    name: "Performance Management",
    description: "Effectively managing team performance and development",
  },
]

// 6-point rating scale
const ratingScale = [
  { value: "6", label: "Outstanding", description: "Consistently exceeds expectations" },
  { value: "5", label: "Superior", description: "Frequently exceeds expectations" },
  { value: "4", label: "Effective", description: "Consistently meets expectations" },
  { value: "3", label: "Standard", description: "Generally meets expectations" },
  { value: "2", label: "Developing", description: "Sometimes meets expectations" },
  { value: "1", label: "Ineffective", description: "Rarely meets expectations" },
]

interface CategoryRating {
  categoryId: string
  rating: string
  supervisorComment: string
  employeeComment: string
}

export function EvaluationForm() {
  const [evaluationType, setEvaluationType] = useState<"employee" | "supervisor">("employee")
  const [ratings, setRatings] = useState<CategoryRating[]>([])
  const [overallComments, setOverallComments] = useState({
    supervisor: "",
    employee: "",
    developmentAreas: "",
    strengths: "",
    goals: "",
  })

  const categories =
    evaluationType === "supervisor" ? [...performanceCategories, ...supervisorCategories] : performanceCategories

  const updateRating = (categoryId: string, field: keyof CategoryRating, value: string) => {
    setRatings((prev) => {
      const existing = prev.find((r) => r.categoryId === categoryId)
      if (existing) {
        return prev.map((r) => (r.categoryId === categoryId ? { ...r, [field]: value } : r))
      } else {
        return [
          ...prev,
          {
            categoryId,
            rating: field === "rating" ? value : "",
            supervisorComment: field === "supervisorComment" ? value : "",
            employeeComment: field === "employeeComment" ? value : "",
          },
        ]
      }
    })
  }

  const getRating = (categoryId: string, field: keyof CategoryRating) => {
    const rating = ratings.find((r) => r.categoryId === categoryId)
    return rating ? rating[field] : ""
  }

  const calculateOverallScore = () => {
    const validRatings = ratings.filter((r) => r.rating).map((r) => Number.parseInt(r.rating))
    if (validRatings.length === 0) return 0
    return (validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length).toFixed(1)
  }

  const submitEvaluation = () => {
    // In a real app, this would save to the backend
    alert("Evaluation submitted successfully!")
  }

  const saveDraft = () => {
    // In a real app, this would save as draft
    alert("Evaluation saved as draft!")
  }

  const previewPDF = () => {
    // In a real app, this would generate PDF preview
    alert("PDF preview would open here!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Evaluation</CardTitle>
          <CardDescription>
            Comprehensive performance assessment based on KISNA Performance Management Guide
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="employee">Employee Name</Label>
              <Input id="employee" placeholder="Employee name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evaluator">Evaluator</Label>
              <Input id="evaluator" placeholder="Evaluator name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Evaluation Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="bi-annual">Bi-Annual</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Employee Type</Label>
            <RadioGroup
              value={evaluationType}
              onValueChange={(value: "employee" | "supervisor") => setEvaluationType(value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employee" id="employee-type" />
                <Label htmlFor="employee-type">Employee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="supervisor" id="supervisor-type" />
                <Label htmlFor="supervisor-type">Supervisor</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Categories</CardTitle>
          <CardDescription>Rate performance in each category using the 6-point scale</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {categories.map((category, index) => (
            <div key={category.id} className="space-y-4">
              <div>
                <h4 className="font-medium text-lg">{category.name}</h4>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>

              <div className="space-y-3">
                <Label>Rating</Label>
                <RadioGroup
                  value={getRating(category.id, "rating")}
                  onValueChange={(value) => updateRating(category.id, "rating", value)}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {ratingScale.map((scale) => (
                    <div key={scale.value} className="flex items-center space-x-2 border rounded-lg p-3">
                      <RadioGroupItem value={scale.value} id={`${category.id}-${scale.value}`} />
                      <div className="flex-1">
                        <Label htmlFor={`${category.id}-${scale.value}`} className="font-medium">
                          {scale.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{scale.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Supervisor Comments</Label>
                  <Textarea
                    value={getRating(category.id, "supervisorComment")}
                    onChange={(e) => updateRating(category.id, "supervisorComment", e.target.value)}
                    placeholder="Provide specific examples and feedback..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employee Comments</Label>
                  <Textarea
                    value={getRating(category.id, "employeeComment")}
                    onChange={(e) => updateRating(category.id, "employeeComment", e.target.value)}
                    placeholder="Employee self-assessment and comments..."
                    rows={3}
                  />
                </div>
              </div>

              {index < categories.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Assessment</CardTitle>
          <CardDescription>Summary comments and development planning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium">Overall Performance Score</h4>
              <p className="text-sm text-muted-foreground">Average across all categories</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{calculateOverallScore()}/6</div>
              <Badge
                variant={
                  Number.parseFloat(calculateOverallScore()) >= 5
                    ? "default"
                    : Number.parseFloat(calculateOverallScore()) >= 4
                      ? "secondary"
                      : Number.parseFloat(calculateOverallScore()) >= 3
                        ? "outline"
                        : "destructive"
                }
              >
                {Number.parseFloat(calculateOverallScore()) >= 5
                  ? "Outstanding"
                  : Number.parseFloat(calculateOverallScore()) >= 4
                    ? "Effective"
                    : Number.parseFloat(calculateOverallScore()) >= 3
                      ? "Standard"
                      : "Developing"}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Key Strengths</Label>
              <Textarea
                value={overallComments.strengths}
                onChange={(e) => setOverallComments((prev) => ({ ...prev, strengths: e.target.value }))}
                placeholder="Highlight the employee's key strengths and achievements..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Development Areas</Label>
              <Textarea
                value={overallComments.developmentAreas}
                onChange={(e) => setOverallComments((prev) => ({ ...prev, developmentAreas: e.target.value }))}
                placeholder="Identify areas for improvement and development..."
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Goals for Next Period</Label>
            <Textarea
              value={overallComments.goals}
              onChange={(e) => setOverallComments((prev) => ({ ...prev, goals: e.target.value }))}
              placeholder="Set specific, measurable goals for the next evaluation period..."
              rows={4}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Supervisor Overall Comments</Label>
              <Textarea
                value={overallComments.supervisor}
                onChange={(e) => setOverallComments((prev) => ({ ...prev, supervisor: e.target.value }))}
                placeholder="Overall assessment and recommendations..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Employee Overall Comments</Label>
              <Textarea
                value={overallComments.employee}
                onChange={(e) => setOverallComments((prev) => ({ ...prev, employee: e.target.value }))}
                placeholder="Employee's overall thoughts and feedback..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Dashboard
        </Button>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={saveDraft}>
            Save as Draft
          </Button>
          <Button variant="outline" onClick={previewPDF}>
            Preview PDF
          </Button>
          <Button onClick={submitEvaluation}>Submit Evaluation</Button>
        </div>
      </div>
    </div>
  )
}
