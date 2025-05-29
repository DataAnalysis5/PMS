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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, X } from "lucide-react"
import { format } from "date-fns"

interface FeedbackEntry {
  id: string
  type: "positive" | "constructive"
  category: string
  message: string
  date: Date
  projectTag?: string
  attachments: string[]
  rating?: number
}

export function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState<"positive" | "constructive">("positive")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [projectTag, setProjectTag] = useState("")
  const [rating, setRating] = useState<number>()
  const [attachments, setAttachments] = useState<string[]>([])
  const [recentFeedback, setRecentFeedback] = useState<FeedbackEntry[]>([])

  const feedbackCategories = [
    "Job Performance",
    "Communication",
    "Teamwork",
    "Leadership",
    "Technical Skills",
    "Problem Solving",
    "Initiative",
    "Customer Service",
    "Project Management",
    "Professional Development",
  ]

  const submitFeedback = () => {
    if (!message.trim()) {
      alert("Please enter feedback message")
      return
    }

    const newFeedback: FeedbackEntry = {
      id: Date.now().toString(),
      type: feedbackType,
      category,
      message: message.trim(),
      date,
      projectTag: projectTag || undefined,
      attachments,
      rating,
    }

    setRecentFeedback((prev) => [newFeedback, ...prev])
    alert("Feedback submitted successfully!")

    // Reset form
    setMessage("")
    setProjectTag("")
    setRating(undefined)
    setAttachments([])
  }

  const saveDraft = () => {
    alert("Feedback saved as draft!")
  }

  const addAttachment = () => {
    // In a real app, this would handle file upload
    const fileName = `document_${Date.now()}.pdf`
    setAttachments((prev) => [...prev, fileName])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Provide Feedback</CardTitle>
          <CardDescription>Document ongoing feedback and coaching for team members</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alice">Alice Johnson</SelectItem>
                  <SelectItem value="bob">Bob Smith</SelectItem>
                  <SelectItem value="carol">Carol Davis</SelectItem>
                  <SelectItem value="david">David Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Feedback Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Feedback Type</Label>
            <RadioGroup
              value={feedbackType}
              onValueChange={(value: "positive" | "constructive") => setFeedbackType(value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="positive" id="positive" />
                <Label htmlFor="positive">Positive/Recognition</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="constructive" id="constructive" />
                <Label htmlFor="constructive">Constructive/Developmental</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {feedbackCategories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, "-")}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project/Task Tag (Optional)</Label>
              <Input
                id="project"
                value={projectTag}
                onChange={(e) => setProjectTag(e.target.value)}
                placeholder="e.g., Q4 Website Redesign"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Feedback Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                feedbackType === "positive"
                  ? "Describe the positive behavior, achievement, or contribution..."
                  : "Provide constructive feedback with specific examples and suggestions for improvement..."
              }
              rows={4}
            />
          </div>

          {feedbackType === "positive" && (
            <div className="space-y-2">
              <Label>Recognition Rating (Optional)</Label>
              <RadioGroup
                value={rating?.toString()}
                onValueChange={(value) => setRating(Number.parseInt(value))}
                className="flex space-x-4"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center space-x-2">
                    <RadioGroupItem value={num.toString()} id={`rating-${num}`} />
                    <Label htmlFor={`rating-${num}`}>{num}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" onClick={addAttachment}>
                <Upload className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </div>
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((attachment, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {attachment}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeAttachment(index)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={saveDraft}>
                Save as Draft
              </Button>
              <Button onClick={submitFeedback}>Submit Feedback</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {recentFeedback.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback Entries</CardTitle>
            <CardDescription>Latest feedback provided to team members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={feedback.type === "positive" ? "default" : "secondary"}>{feedback.type}</Badge>
                      <Badge variant="outline">{feedback.category}</Badge>
                      {feedback.projectTag && <Badge variant="outline">{feedback.projectTag}</Badge>}
                      {feedback.rating && <Badge variant="default">{feedback.rating}/5</Badge>}
                    </div>
                    <p className="text-sm mb-2">{feedback.message}</p>
                    <p className="text-xs text-muted-foreground">{format(feedback.date, "PPP")}</p>
                    {feedback.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {feedback.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            📎 {attachment}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
