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
import { FileText, Search, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import { useNotifications } from "@/components/notification-provider"

interface Claim {
  id: string
  memberId: string
  memberName: string
  type: string
  description: string
  amount: string
  dateSubmitted: string
  status: "Pending" | "Approved" | "Rejected" | "Under Review"
  documents: string[]
  adminNotes?: string
  reviewedBy?: string
  reviewDate?: string
}

export function ClaimsProcessingTab() {
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "CLM-2024-001",
      memberId: "AAA-2024-001",
      memberName: "John Doe",
      type: "Medical",
      description: "Hospital visit for emergency treatment",
      amount: "$1,250.00",
      dateSubmitted: "Mar 15, 2024",
      status: "Pending",
      documents: ["medical-receipt.pdf", "doctor-note.pdf"],
    },
    {
      id: "CLM-2024-002",
      memberId: "AAA-2024-002",
      memberName: "Jane Smith",
      type: "Dental",
      description: "Routine dental cleaning and checkup",
      amount: "$180.00",
      dateSubmitted: "Mar 10, 2024",
      status: "Under Review",
      documents: ["dental-invoice.pdf"],
    },
    {
      id: "CLM-2024-003",
      memberId: "AAA-2024-003",
      memberName: "Bob Johnson",
      type: "Vision",
      description: "Eye exam and prescription glasses",
      amount: "$320.00",
      dateSubmitted: "Feb 28, 2024",
      status: "Approved",
      documents: ["vision-receipt.pdf", "prescription.pdf"],
      adminNotes: "All documentation verified. Approved for full amount.",
      reviewedBy: "Admin User",
      reviewDate: "Mar 01, 2024",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  const { addNotification } = useNotifications()

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.memberId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || claim.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleClaimDecision = (claimId: string, decision: "Approved" | "Rejected", notes: string) => {
    const claim = claims.find((c) => c.id === claimId)

    setClaims(
      claims.map((claim) =>
        claim.id === claimId
          ? {
              ...claim,
              status: decision,
              adminNotes: notes,
              reviewedBy: "Admin User",
              reviewDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
            }
          : claim,
      ),
    )
    setReviewNotes("")

    if (claim) {
      addNotification({
        type: decision === "Approved" ? "success" : "error",
        title: `Claim ${decision}`,
        message: `Claim ${claimId} for ${claim.memberName} has been ${decision.toLowerCase()}`,
        duration: 6000,
      })
    }
  }

  const handleQuickApproval = (claim: Claim) => {
    handleClaimDecision(claim.id, "Approved", "Quick approval")
  }

  const handleQuickRejection = (claim: Claim) => {
    handleClaimDecision(claim.id, "Rejected", "Quick rejection")
  }

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim)
    addNotification({
      type: "info",
      title: "Opening Claim Review",
      message: `Loading review interface for claim ${claim.id}`,
      duration: 3000,
    })
  }

  const getStatusIcon = (status: Claim["status"]) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Pending":
      case "Under Review":
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: Claim["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
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
          <h2 className="text-2xl font-bold text-foreground">Claims Processing</h2>
          <p className="text-muted-foreground">Review and process member claims</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
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
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
                  {claims.filter((c) => c.status === "Pending" || c.status === "Under Review").length}
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
                <p className="text-2xl font-bold">{claims.filter((c) => c.status === "Approved").length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{claims.filter((c) => c.status === "Rejected").length}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{claims.length}</p>
                <p className="text-xs text-muted-foreground">Total Claims</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Claims ({filteredClaims.length})
          </CardTitle>
          <CardDescription>Review and process member benefit claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClaims.map((claim) => (
              <div key={claim.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{claim.id}</h3>
                        <Badge variant="outline">{claim.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {claim.memberName} ({claim.memberId})
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">{claim.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {claim.dateSubmitted} • {claim.documents.length} document(s)
                      </p>
                      {claim.adminNotes && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                          <strong>Admin Notes:</strong> {claim.adminNotes}
                          {claim.reviewedBy && (
                            <div className="text-muted-foreground mt-1">
                              Reviewed by {claim.reviewedBy} on {claim.reviewDate}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-xl font-bold text-foreground">{claim.amount}</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(claim.status)}
                      <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleViewClaim(claim)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review Claim</DialogTitle>
                        <DialogDescription>Review and process claim {claim.id}</DialogDescription>
                      </DialogHeader>
                      {selectedClaim && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Claim ID</Label>
                              <p className="text-sm text-muted-foreground">{selectedClaim.id}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Member</Label>
                              <p className="text-sm text-muted-foreground">
                                {selectedClaim.memberName} ({selectedClaim.memberId})
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Type</Label>
                              <p className="text-sm text-muted-foreground">{selectedClaim.type}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Amount</Label>
                              <p className="text-sm text-muted-foreground">{selectedClaim.amount}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <p className="text-sm text-muted-foreground">{selectedClaim.description}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Documents</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedClaim.documents.map((doc, index) => (
                                <Badge key={index} variant="outline">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="notes">Review Notes</Label>
                            <Textarea
                              id="notes"
                              value={reviewNotes}
                              onChange={(e) => setReviewNotes(e.target.value)}
                              placeholder="Add your review notes..."
                              rows={3}
                            />
                          </div>
                          {(selectedClaim.status === "Pending" || selectedClaim.status === "Under Review") && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleClaimDecision(selectedClaim.id, "Approved", reviewNotes)}
                                className="flex-1"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleClaimDecision(selectedClaim.id, "Rejected", reviewNotes)}
                                className="flex-1"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {(claim.status === "Pending" || claim.status === "Under Review") && (
                    <>
                      <Button size="sm" onClick={() => handleQuickApproval(claim)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleQuickRejection(claim)}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
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
