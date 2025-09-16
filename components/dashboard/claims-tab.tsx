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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Upload, Clock, CheckCircle, XCircle, Calendar } from "lucide-react"
import { useNotifications } from "@/components/notification-provider"

interface Claim {
  id: string
  type: string
  description: string
  amount: string
  dateSubmitted: string
  status: "Pending" | "Approved" | "Rejected" | "Under Review"
  documents: string[]
  notes?: string
}

export function ClaimsTab() {
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "CLM-2024-001",
      type: "Medical",
      description: "Hospital visit for emergency treatment",
      amount: "$1,250.00",
      dateSubmitted: "Mar 15, 2024",
      status: "Approved",
      documents: ["medical-receipt.pdf", "doctor-note.pdf"],
      notes: "Approved for full amount",
    },
    {
      id: "CLM-2024-002",
      type: "Dental",
      description: "Routine dental cleaning and checkup",
      amount: "$180.00",
      dateSubmitted: "Mar 10, 2024",
      status: "Pending",
      documents: ["dental-invoice.pdf"],
    },
    {
      id: "CLM-2024-003",
      type: "Vision",
      description: "Eye exam and prescription glasses",
      amount: "$320.00",
      dateSubmitted: "Feb 28, 2024",
      status: "Under Review",
      documents: ["vision-receipt.pdf", "prescription.pdf"],
    },
  ])

  const [isNewClaimOpen, setIsNewClaimOpen] = useState(false)
  const [newClaim, setNewClaim] = useState({
    type: "",
    description: "",
    amount: "",
    documents: [] as File[],
  })

  const { addNotification } = useNotifications()

  const handleSubmitClaim = () => {
    const claim: Claim = {
      id: `CLM-2024-${String(claims.length + 1).padStart(3, "0")}`,
      ...newClaim,
      dateSubmitted: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: "Pending",
      documents: newClaim.documents.map((file) => file.name),
    }
    setClaims([claim, ...claims])
    setNewClaim({ type: "", description: "", amount: "", documents: [] })
    setIsNewClaimOpen(false)
    addNotification({
      type: "success",
      title: "Claim Submitted Successfully",
      message: `Your ${newClaim.type} claim for ${newClaim.amount} has been submitted for review`,
      duration: 6000,
    })
  }

  const handleViewClaim = (claim: Claim) => {
    addNotification({
      type: "info",
      title: "Loading Claim Details",
      message: `Opening details for claim ${claim.id}`,
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Claims</h2>
          <p className="text-muted-foreground">Submit and track your benefit claims</p>
        </div>
        <Dialog open={isNewClaimOpen} onOpenChange={setIsNewClaimOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Claim</DialogTitle>
              <DialogDescription>Fill out the details for your new benefit claim</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Claim Type</Label>
                  <Select value={newClaim.type} onValueChange={(value) => setNewClaim({ ...newClaim, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select claim type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Dental">Dental</SelectItem>
                      <SelectItem value="Vision">Vision</SelectItem>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Claim Amount</Label>
                  <Input
                    id="amount"
                    value={newClaim.amount}
                    onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })}
                    placeholder="$0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newClaim.description}
                  onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
                  placeholder="Describe your claim in detail..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documents">Supporting Documents</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Drag and drop files here, or click to select files</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB each</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmitClaim} className="flex-1">
                  Submit Claim
                </Button>
                <Button variant="outline" onClick={() => setIsNewClaimOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Claims Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {claims.filter((c) => c.status === "Pending" || c.status === "Under Review").length}
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
      <div className="space-y-4">
        {claims.map((claim) => (
          <Card
            key={claim.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleViewClaim(claim)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{claim.id}</h3>
                      <Badge variant="outline">{claim.type}</Badge>
                    </div>
                    <p className="text-muted-foreground">{claim.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Submitted {claim.dateSubmitted}</span>
                      </div>
                      <span>•</span>
                      <span>{claim.documents.length} document(s)</span>
                    </div>
                    {claim.notes && <p className="text-sm text-muted-foreground italic">{claim.notes}</p>}
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
