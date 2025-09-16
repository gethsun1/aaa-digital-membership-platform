"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, TrendingUp, Users, FileText, DollarSign } from "lucide-react"
import { AnalyticsDashboard } from "./analytics-dashboard"

export function ReportsTab() {
  const [reportType, setReportType] = useState("overview")
  const [dateRange, setDateRange] = useState("last30")
  const [benefitType, setBenefitType] = useState("all")

  const reportData = {
    overview: {
      totalMembers: 1247,
      activeMembers: 1189,
      totalClaims: 342,
      approvedClaims: 298,
      rejectedClaims: 31,
      pendingClaims: 13,
      totalPaid: 156780.5,
      averageClaimAmount: 458.42,
    },
    trends: {
      membershipGrowth: "+12.5%",
      claimApprovalRate: "87.2%",
      averageProcessingTime: "3.2 days",
      memberSatisfaction: "94.8%",
    },
  }

  const generateReport = () => {
    console.log("Generating report with filters:", { reportType, dateRange, benefitType })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analytics" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
            <p className="text-muted-foreground">Comprehensive analytics and reporting dashboard</p>
          </div>
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Report Filters */}
          <div className="flex gap-2">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="members">Members</SelectItem>
                <SelectItem value="claims">Claims</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="last90">Last 90 days</SelectItem>
                <SelectItem value="last365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={benefitType} onValueChange={setBenefitType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="dental">Dental</SelectItem>
                <SelectItem value="vision">Vision</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateReport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{reportData.overview.totalMembers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Members</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">{reportData.trends.membershipGrowth}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{reportData.overview.totalClaims}</p>
                    <p className="text-xs text-muted-foreground">Total Claims</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {reportData.trends.claimApprovalRate} approval rate
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">${reportData.overview.totalPaid.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Paid Out</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">
                        ${reportData.overview.averageClaimAmount} avg claim
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{reportData.trends.averageProcessingTime}</p>
                    <p className="text-xs text-muted-foreground">Avg Processing</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {reportData.trends.memberSatisfaction} satisfaction
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Claims Status Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Claims Status Distribution
                </CardTitle>
                <CardDescription>Breakdown of claim statuses for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{reportData.overview.approvedClaims}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {((reportData.overview.approvedClaims / reportData.overview.totalClaims) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Rejected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{reportData.overview.rejectedClaims}</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {((reportData.overview.rejectedClaims / reportData.overview.totalClaims) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{reportData.overview.pendingClaims}</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {((reportData.overview.pendingClaims / reportData.overview.totalClaims) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Membership Status
                </CardTitle>
                <CardDescription>Current membership status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm">Active Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{reportData.overview.activeMembers}</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {((reportData.overview.activeMembers / reportData.overview.totalMembers) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Inactive Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {reportData.overview.totalMembers - reportData.overview.activeMembers}
                      </span>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        {(
                          ((reportData.overview.totalMembers - reportData.overview.activeMembers) /
                            reportData.overview.totalMembers) *
                          100
                        ).toFixed(1)}
                        %
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Recent Activity Summary
              </CardTitle>
              <CardDescription>Key activities and trends from the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Top Performing Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Claim Approval Rate</span>
                      <Badge className="bg-green-100 text-green-800">{reportData.trends.claimApprovalRate}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">Member Satisfaction</span>
                      <Badge className="bg-blue-100 text-blue-800">{reportData.trends.memberSatisfaction}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                      <span className="text-sm">Processing Time</span>
                      <Badge className="bg-purple-100 text-purple-800">{reportData.trends.averageProcessingTime}</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Areas for Attention</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">Pending Claims</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{reportData.overview.pendingClaims} items</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm">Overdue Renewals</span>
                      <Badge className="bg-orange-100 text-orange-800">23 members</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">Suspended Accounts</span>
                      <Badge className="bg-red-100 text-red-800">7 accounts</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
