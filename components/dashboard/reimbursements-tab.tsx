"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Clock, AlertTriangle, CheckCircle, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useNotifications } from "@/components/notification-provider"
import { useState, useEffect } from "react"

interface Reimbursement {
  id: string
  claimId: string
  description: string
  amount: string
  approvedDate: string
  expiryDate: string
  daysLeft: number
  status: "Active" | "Claimed" | "Expired"
  progress: number
}

export function ReimbursementsTab() {
  const { addNotification } = useNotifications()
  const [redeemOpen, setRedeemOpen] = useState(false)
  const [redeemCode, setRedeemCode] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const calculateDaysLeft = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - currentTime.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const reimbursements: Reimbursement[] = [
    {
      id: "RMB-2024-001",
      claimId: "CLM-2024-001",
      description: "Hospital visit reimbursement",
      amount: "$1,250.00",
      approvedDate: "Mar 20, 2024",
      expiryDate: "2024-12-31",
      daysLeft: calculateDaysLeft("2024-12-31"),
      status: "Active",
      progress: 100 - (calculateDaysLeft("2024-12-31") / 30) * 100,
    },
    {
      id: "RMB-2024-002",
      claimId: "CLM-2023-045",
      description: "Prescription medication reimbursement",
      amount: "$89.50",
      approvedDate: "Feb 15, 2024",
      expiryDate: "2024-12-15",
      daysLeft: calculateDaysLeft("2024-12-15"),
      status: "Active",
      progress: 100 - (calculateDaysLeft("2024-12-15") / 30) * 100,
    },
    {
      id: "RMB-2023-089",
      claimId: "CLM-2023-032",
      description: "Dental cleaning reimbursement",
      amount: "$180.00",
      approvedDate: "Dec 10, 2023",
      expiryDate: "Jan 09, 2024",
      daysLeft: 0,
      status: "Claimed",
      progress: 100,
    },
  ]

  const activeReimbursements = reimbursements.filter((r) => r.status === "Active")
  const totalActive = activeReimbursements.reduce((sum, r) => sum + Number.parseFloat(r.amount.replace("$", "")), 0)

  const getStatusColor = (status: Reimbursement["status"]) => {
    switch (status) {
      case "Active":
        return "bg-primary/10 text-primary"
      case "Claimed":
        return "bg-green-100 text-green-800"
      case "Expired":
        return "bg-red-100 text-red-800"
    }
  }

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 7) return "text-red-600"
    if (daysLeft <= 14) return "text-yellow-600"
    return "text-primary"
  }

  useEffect(() => {
    const urgentReimbursements = reimbursements.filter(
      (r) => r.status === "Active" && r.daysLeft <= 3 && r.daysLeft > 0,
    )

    urgentReimbursements.forEach((reimbursement) => {
      if (Math.random() > 0.7) {
        // Simulate occasional warnings
        addNotification({
          type: "warning",
          title: "Reimbursement Expiring Soon",
          message: `${reimbursement.description} expires in ${reimbursement.daysLeft} days`,
          duration: 8000,
        })
      }
    })
  }, [currentTime.getMinutes()]) // Check every minute

  const handleClaimReimbursement = (reimbursement: Reimbursement) => {
    setSelectedId(reimbursement.id)
    setRedeemOpen(true)
  }

  const confirmRedeem = () => {
    addNotification({
      type: "success",
      title: "Redeem Request Submitted",
      message: `Code ${redeemCode || "XXXXXX"} submitted for ${selectedId}`,
      duration: 6000,
    })
    setRedeemCode("")
    setRedeemOpen(false)
  }

  const handleViewDetails = (reimbursement: Reimbursement) => {
    addNotification({
      type: "info",
      title: "Opening Details",
      message: `Loading details for reimbursement ${reimbursement.id}`,
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Active Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">${totalActive.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">{activeReimbursements.length} active reimbursements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              {activeReimbursements.filter((r) => r.daysLeft <= 14).length}
            </p>
            <p className="text-sm text-muted-foreground">Within 14 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Total Claimed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {reimbursements.filter((r) => r.status === "Claimed").length}
            </p>
            <p className="text-sm text-muted-foreground">Successfully claimed</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Reimbursements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Active Reimbursements
          </CardTitle>
          <CardDescription>Reimbursements available for claiming</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeReimbursements.map((reimbursement) => (
              <div key={reimbursement.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{reimbursement.description}</h3>
                    <p className="text-sm text-muted-foreground">Claim ID: {reimbursement.claimId}</p>
                    <p className="text-sm text-muted-foreground">Approved: {reimbursement.approvedDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{reimbursement.amount}</p>
                    <Badge className={getStatusColor(reimbursement.status)}>{reimbursement.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time remaining</span>
                    <span className={`font-medium ${getUrgencyColor(reimbursement.daysLeft)}`}>
                      {reimbursement.daysLeft} days left
                    </span>
                  </div>
                  <Progress value={reimbursement.progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Expires: {reimbursement.expiryDate}</span>
                    {reimbursement.daysLeft <= 7 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Urgent</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1" onClick={() => handleClaimReimbursement(reimbursement)}>
                    Claim Now
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(reimbursement)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reimbursement History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Reimbursement History
          </CardTitle>
          <CardDescription>All your reimbursement records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reimbursements.map((reimbursement) => (
              <div
                key={reimbursement.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{reimbursement.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {reimbursement.id} • Approved {reimbursement.approvedDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{reimbursement.amount}</p>
                  <Badge className={getStatusColor(reimbursement.status)}>{reimbursement.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Redeem dialog mounted near root to avoid nested layouts
export function ReimbursementsRedeemDialog({ open, onOpenChange, onConfirm, code, setCode }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem Reimbursement</DialogTitle>
          <DialogDescription>
            Enter the event code you received to redeem this reimbursement.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Enter 6-digit code" value={code} onChange={(e) => setCode(e.target.value)} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={onConfirm}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
