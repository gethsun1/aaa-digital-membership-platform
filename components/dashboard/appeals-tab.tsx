"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Scale, Plus, Upload, CheckCircle, XCircle, Clock, Calendar, FileText } from "lucide-react"

interface Appeal {
  id: string
  claimId: string
  reason: string
  description: string
  dateSubmitted: string
  status: "Pending" | "Won" | "Lost" | "Under Review"
  documents: string[]
  resolution?: string
  resolutionDate?: string
}

export function AppealsTab() {
  const [appeals, setAppeals] = useState<Appeal[]>([
    {
      id: "APL-2024-001",
      claimId: "CLM-2024-003",
      reason: "Incorrect denial reason",
      description: "The claim was denied due to insufficient documentation, but all required documents were provided.",
      dateSubmitted: "Mar 25, 2024",
      status: "Under Review",
      documents: ["additional-receipt.pdf", "doctor-statement.pdf"],
    },
    {
      id: "APL-2023-012",
      claimId: "CLM-2023-089",
      reason: "Coverage dispute",
      description: "Claim was denied stating procedure not covered, but it's clearly listed in my plan benefits.",
      dateSubmitted: "Dec 15, 2023",
      status: "Won",
      documents: ["policy-document.pdf", "procedure-details.pdf"],
      resolution: "Appeal approved. Claim will be processed for full amount.",
      resolutionDate: "Jan 10, 2024",
    },
    {
      id: "APL-2023-008",
      claimId: "CLM-2023-045",
      reason: "Amount dispute",
      description: "Reimbursement amount was calculated incorrectly based on my coverage level.",
      dateSubmitted: "Nov 20, 2023",
      status: "Lost",
      documents: ["calculation-dispute.pdf"],
      resolution: "Original decision upheld. Calculation was correct based on policy terms.",
      resolutionDate: "Dec 05, 2023",
    },
  ])

  const [isNewAppealOpen, setIsNewAppealOpen] = useState(false)
  const [newAppeal, setNewAppeal] = useState({
    claimId: "",
    reason: "",
    description: "",
    documents: [] as File[],
  })

  const handleSubmitAppeal = () => {
    const appeal: Appeal = {
      id: `APL-2024-${String(appeals.length + 1).padStart(3, "0")}`,
      ...newAppeal,
      dateSubmitted: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: "Pending",
      documents: newAppeal.documents.map((file) => file.name),
    }
    setAppeals([appeal, ...appeals])
    setNewAppeal({ claimId: "", reason: "", description: "", documents: [] })
    setIsNewAppealOpen(false)
  }

  const getStatusIcon = (status: Appeal["status"]) => {
    switch (status) {
      case "Won":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Lost":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Pending":
      case "Under Review":
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: Appeal["status"]) => {
    switch (status) {
      case "Won":
        return "bg-green-100 text-green-800"
      case "Lost":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appeals</h2>
          <p className="text-muted-foreground">Submit and track appeals for denied or disputed claims</p>
        </div>
        <Dialog open={isNewAppealOpen} onOpenChange={setIsNewAppealOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Appeal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Appeal</DialogTitle>
              <DialogDescription>Appeal a denied or disputed claim decision</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="claimId">Claim ID</Label>
                <Input
                  id="claimId"
                  value={newAppeal.claimId}
                  onChange={(e) => setNewAppeal({ ...newAppeal, claimId: e.target.value })}
                  placeholder="CLM-2024-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Appeal</Label>
                <Input
                  id="reason"
                  value={newAppeal.reason}
                  onChange={(e) => setNewAppeal({ ...newAppeal, reason: e.target.value })}
                  placeholder="Brief reason for the appeal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  value={newAppeal.description}
                  onChange={(e) => setNewAppeal({ ...newAppeal, description: e.target.value })}
                  placeholder="Provide detailed explanation of why you believe the decision should be reversed..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documents">Supporting Documents</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Upload additional evidence to support your appeal</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB each</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmitAppeal} className="flex-1">
                  Submit Appeal
                </Button>
                <Button variant="outline" onClick={() => setIsNewAppealOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Appeals Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {appeals.filter((a) => a.status === "Pending" || a.status === "Under Review").length}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{appeals.filter((a) => a.status === "Won").length}</p>
                <p className="text-xs text-muted-foreground">Won</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{appeals.filter((a) => a.status === "Lost").length}</p>
                <p className="text-xs text-muted-foreground">Lost</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{appeals.length}</p>
                <p className="text-xs text-muted-foreground">Total Appeals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appeals List */}
      <div className="space-y-4">
        {appeals.map((appeal) => (
          <Card key={appeal.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{appeal.id}</h3>
                      <Badge variant="outline">Claim: {appeal.claimId}</Badge>
                    </div>
                    <p className="font-medium text-foreground">{appeal.reason}</p>
                    <p className="text-muted-foreground text-sm">{appeal.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Submitted {appeal.dateSubmitted}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{appeal.documents.length} document(s)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(appeal.status)}
                    <Badge className={getStatusColor(appeal.status)}>{appeal.status}</Badge>
                  </div>
                </div>
              </div>

              {appeal.resolution && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">Resolution</span>
                    {appeal.resolutionDate && (
                      <span className="text-sm text-muted-foreground">• {appeal.resolutionDate}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{appeal.resolution}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
