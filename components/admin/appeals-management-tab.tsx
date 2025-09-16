"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Scale, Search, CheckCircle, XCircle, Clock, Eye, Calendar } from "lucide-react"

interface Appeal {
  id: string
  claimId: string
  memberId: string
  memberName: string
  reason: string
  description: string
  dateSubmitted: string
  status: "Pending" | "Won" | "Lost" | "Under Review"
  documents: string[]
  resolution?: string
  resolutionDate?: string
  reviewedBy?: string
}

export function AppealsManagementTab() {
  const [appeals, setAppeals] = useState<Appeal[]>([
    {
      id: "APL-2024-001",
      claimId: "CLM-2024-003",
      memberId: "AAA-2024-001",
      memberName: "John Doe",
      reason: "Incorrect denial reason",
      description: "The claim was denied due to insufficient documentation, but all required documents were provided.",
      dateSubmitted: "Mar 25, 2024",
      status: "Under Review",
      documents: ["additional-receipt.pdf", "doctor-statement.pdf"],
    },
    {
      id: "APL-2024-002",
      claimId: "CLM-2024-005",
      memberId: "AAA-2024-002",
      memberName: "Jane Smith",
      reason: "Coverage dispute",
      description: "Claim was denied stating procedure not covered, but it's clearly listed in my plan benefits.",
      dateSubmitted: "Mar 20, 2024",
      status: "Pending",
      documents: ["policy-document.pdf", "procedure-details.pdf"],
    },
    {
      id: "APL-2023-012",
      claimId: "CLM-2023-089",
      memberId: "AAA-2024-003",
      memberName: "Bob Johnson",
      reason: "Amount dispute",
      description: "Reimbursement amount was calculated incorrectly based on my coverage level.",
      dateSubmitted: "Dec 15, 2023",
      status: "Won",
      documents: ["calculation-dispute.pdf"],
      resolution: "Appeal approved. Original claim will be processed for full amount as requested.",
      resolutionDate: "Jan 10, 2024",
      reviewedBy: "Admin User",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAppeal, setSelectedAppeal] = useState<Appeal | null>(null)
  const [resolutionNotes, setResolutionNotes] = useState("")

  const filteredAppeals = appeals.filter((appeal) => {
    const matchesSearch =
      appeal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.claimId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appeal.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleAppealDecision = (appealId: string, decision: "Won" | "Lost", resolution: string) => {
    setAppeals(
      appeals.map((appeal) =>
        appeal.id === appealId
          ? {
              ...appeal,
              status: decision,
              resolution,
              resolutionDate: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              reviewedBy: "Admin User",
            }
          : appeal,
      ),
    )
    setResolutionNotes("")
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
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appeals Management</h2>
          <p className="text-muted-foreground">Review and decide on member appeals</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appeals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under review">Under Review</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {appeals.filter((a) => a.status === "Pending" || a.status === "Under Review").length}
                </p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Appeals ({filteredAppeals.length})
          </CardTitle>
          <CardDescription>Review and decide on member appeals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppeals.map((appeal) => (
              <div key={appeal.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{appeal.id}</h3>
                        <Badge variant="outline">Claim: {appeal.claimId}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {appeal.memberName} ({appeal.memberId})
                      </p>
                      <p className="font-medium text-foreground mb-1">{appeal.reason}</p>
                      <p className="text-sm text-muted-foreground mb-2">{appeal.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Submitted {appeal.dateSubmitted}</span>
                        </div>
                        <span>•</span>
                        <span>{appeal.documents.length} document(s)</span>
                      </div>
                      {appeal.resolution && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                          <strong>Resolution:</strong> {appeal.resolution}
                          {appeal.reviewedBy && (
                            <div className="text-muted-foreground mt-1">
                              Decided by {appeal.reviewedBy} on {appeal.resolutionDate}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(appeal.status)}
                      <Badge className={getStatusColor(appeal.status)}>{appeal.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedAppeal(appeal)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review Appeal</DialogTitle>
                        <DialogDescription>Review and decide on appeal {appeal.id}</DialogDescription>
                      </DialogHeader>
                      {selectedAppeal && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Appeal ID</Label>
                              <p className="text-sm text-muted-foreground">{selectedAppeal.id}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Claim ID</Label>
                              <p className="text-sm text-muted-foreground">{selectedAppeal.claimId}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Member</Label>
                              <p className="text-sm text-muted-foreground">
                                {selectedAppeal.memberName} ({selectedAppeal.memberId})
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Date Submitted</Label>
                              <p className="text-sm text-muted-foreground">{selectedAppeal.dateSubmitted}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Reason</Label>
                            <p className="text-sm text-muted-foreground">{selectedAppeal.reason}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <p className="text-sm text-muted-foreground">{selectedAppeal.description}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Supporting Documents</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedAppeal.documents.map((doc, index) => (
                                <Badge key={index} variant="outline">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="resolution">Resolution Notes</Label>
                            <Textarea
                              id="resolution"
                              value={resolutionNotes}
                              onChange={(e) => setResolutionNotes(e.target.value)}
                              placeholder="Provide detailed resolution notes..."
                              rows={3}
                            />
                          </div>
                          {(selectedAppeal.status === "Pending" || selectedAppeal.status === "Under Review") && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleAppealDecision(selectedAppeal.id, "Won", resolutionNotes)}
                                className="flex-1"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve Appeal
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleAppealDecision(selectedAppeal.id, "Lost", resolutionNotes)}
                                className="flex-1"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Deny Appeal
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {(appeal.status === "Pending" || appeal.status === "Under Review") && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAppealDecision(appeal.id, "Won", "Appeal approved after review")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleAppealDecision(appeal.id, "Lost", "Appeal denied after review")}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Deny
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
