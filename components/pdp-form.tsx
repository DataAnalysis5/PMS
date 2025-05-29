"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"

interface PDPGoal {
  id: string
  skill: string
  description: string
  timeline: Date | undefined
  resources: string[]
  expectedOutcome: string
  priority: "high" | "medium" | "low"
}

export function PDPForm() {
  const [goals, setGoals] = useState<PDPGoal[]>([])
  const [currentGoal, setCurrentGoal] = useState<Partial<PDPGoal>>({
    skill: "",
    description: "",
    timeline: undefined,
    resources: [],
    expectedOutcome: "",
    priority: "medium",
  })
  const [newResource, setNewResource] = useState("")

  const addResource = () => {
    if (newResource.trim()) {
      setCurrentGoal((prev) => ({
        ...prev,
        resources: [...(prev.resources || []), newResource.trim()],
      }))
      setNewResource("")
    }
  }

  const removeResource = (index: number) => {
    setCurrentGoal((prev) => ({
      ...prev,
      resources: prev.resources?.filter((_, i) => i !== index) || [],
    }))
  }

  const addGoal = () => {
    if (currentGoal.skill && currentGoal.description) {
      const newGoal: PDPGoal = {
        id: Date.now().toString(),
        skill: currentGoal.skill,
        description: currentGoal.description,
        timeline: currentGoal.timeline,
        resources: currentGoal.resources || [],
        expectedOutcome: currentGoal.expectedOutcome || "",
        priority: currentGoal.priority || "medium",
      }
      setGoals((prev) => [...prev, newGoal])
      setCurrentGoal({
        skill: "",
        description: "",
        timeline: undefined,
        resources: [],
        expectedOutcome: "",
        priority: "medium",
      })
    }
  }

  const savePDP = () => {
    // In a real app, this would save to the backend
    alert("PDP saved successfully!")
  }

  const submitPDP = () => {
    // In a real app, this would submit for approval
    alert("PDP submitted for approval!")
  }

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Development Plan (PDP)</CardTitle>
          <CardDescription>
            Create a comprehensive development plan to enhance skills and achieve career goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Input id="employee" placeholder="Employee name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisor">Supervisor</Label>
              <Input id="supervisor" placeholder="Supervisor name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Department" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Review Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1">Q1 2024</SelectItem>
                  <SelectItem value="q2">Q2 2024</SelectItem>
                  <SelectItem value="q3">Q3 2024</SelectItem>
                  <SelectItem value="q4">Q4 2024</SelectItem>
                  <SelectItem value="annual">Annual 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Development Goals</CardTitle>
          <CardDescription>Add specific skills and development objectives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="skill">Skill to Acquire/Improve</Label>
              <Input
                id="skill"
                value={currentGoal.skill}
                onChange={(e) => setCurrentGoal((prev) => ({ ...prev, skill: e.target.value }))}
                placeholder="e.g., React Development, Leadership, Communication"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Development Goal Description</Label>
              <Textarea
                id="description"
                value={currentGoal.description}
                onChange={(e) => setCurrentGoal((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the specific development goal and how it aligns with departmental needs"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Target Completion Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentGoal.timeline ? format(currentGoal.timeline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentGoal.timeline}
                      onSelect={(date) => setCurrentGoal((prev) => ({ ...prev, timeline: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={currentGoal.priority}
                  onValueChange={(value: "high" | "medium" | "low") =>
                    setCurrentGoal((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Resources Required</Label>
              <div className="flex space-x-2">
                <Input
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                  placeholder="e.g., Training course, Mentor, Books"
                  onKeyPress={(e) => e.key === "Enter" && addResource()}
                />
                <Button type="button" onClick={addResource}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentGoal.resources?.map((resource, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {resource}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeResource(index)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outcome">Expected Outcome</Label>
              <Textarea
                id="outcome"
                value={currentGoal.expectedOutcome}
                onChange={(e) => setCurrentGoal((prev) => ({ ...prev, expectedOutcome: e.target.value }))}
                placeholder="Describe the expected outcome and how success will be measured"
                rows={2}
              />
            </div>

            <Button onClick={addGoal} className="w-full">
              Add Development Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Added Goals ({goals.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{goal.skill}</h4>
                      <Badge
                        variant={
                          goal.priority === "high"
                            ? "destructive"
                            : goal.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {goal.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                    {goal.timeline && (
                      <p className="text-sm">
                        <strong>Target:</strong> {format(goal.timeline, "PPP")}
                      </p>
                    )}
                    {goal.resources.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {goal.resources.map((resource, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {goal.expectedOutcome && (
                      <p className="text-sm mt-2">
                        <strong>Expected Outcome:</strong> {goal.expectedOutcome}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeGoal(goal.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Dashboard
        </Button>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={savePDP}>
            Save as Draft
          </Button>
          <Button onClick={submitPDP}>Submit PDP</Button>
        </div>
      </div>
    </div>
  )
}
