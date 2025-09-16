"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, CreditCard, RefreshCw, CheckCircle, Clock } from "lucide-react"

export function MembershipTab() {
  const membershipData = {
    status: "Active",
    type: "Premium Individual",
    joinDate: "January 15, 2020",
    renewalDate: "January 15, 2025",
    daysUntilRenewal: 120,
    renewalProgress: 75,
  }

  const renewalHistory = [
    { year: "2024", date: "Jan 15, 2024", amount: "$299.00", status: "Completed" },
    { year: "2023", date: "Jan 15, 2023", amount: "$279.00", status: "Completed" },
    { year: "2022", date: "Jan 15, 2022", amount: "$259.00", status: "Completed" },
    { year: "2021", date: "Jan 15, 2021", amount: "$249.00", status: "Completed" },
  ]

  return (
    <div className="space-y-6">
      {/* Membership Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Membership Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {membershipData.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium">{membershipData.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">{membershipData.joinDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Next Renewal</span>
              <span className="font-medium">{membershipData.renewalDate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Renewal Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Days until renewal</span>
                <span className="text-2xl font-bold text-primary">{membershipData.daysUntilRenewal}</span>
              </div>
              <Progress value={membershipData.renewalProgress} className="h-2" />
            </div>
            <div className="pt-4">
              <Button className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Renew Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Renewal History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Renewal History
          </CardTitle>
          <CardDescription>Your membership renewal history and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {renewalHistory.map((renewal, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Membership Renewal {renewal.year}</p>
                    <p className="text-sm text-muted-foreground">{renewal.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{renewal.amount}</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {renewal.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
