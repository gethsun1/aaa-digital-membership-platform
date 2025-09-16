"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Shield, User, Users, CreditCard, FileText, DollarSign, Scale, LogOut, Bell, Settings } from "lucide-react"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPanel } from "@/components/notifications-panel"
import { DocumentsTab } from "@/components/dashboard/documents-tab"
import { KycWizard } from "@/components/dashboard/kyc-wizard"
import { useAuth } from "@/components/auth-guard"
import { MembershipTab } from "@/components/dashboard/membership-tab"
import { BeneficiariesTab } from "@/components/dashboard/beneficiaries-tab"
import { PaymentsTab } from "@/components/dashboard/payments-tab"
import { ClaimsTab } from "@/components/dashboard/claims-tab"
import { ReimbursementsTab } from "@/components/dashboard/reimbursements-tab"
import { AppealsTab } from "@/components/dashboard/appeals-tab"

export function UserDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("membership")
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isKycOpen, setIsKycOpen] = useState(false)

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brand />
              <div className="hidden md:block">
                <p className="text-sm text-muted-foreground">Member Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setIsNotificationsOpen(true)}>
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <AvatarInitials name={user.name} />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.membershipId}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Membership ID: {user.membershipId}</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Active Member
            </Badge>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="membership" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Membership</span>
            </TabsTrigger>
            <TabsTrigger value="beneficiaries" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Beneficiaries</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Claims</span>
            </TabsTrigger>
            <TabsTrigger value="reimbursements" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Reimbursements</span>
            </TabsTrigger>
            <TabsTrigger value="appeals" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">Appeals</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="membership">
            <div className="space-y-4">
              <MembershipTab />
              <div className="flex justify-end">
                <Button size="sm" variant="outline" className="bg-transparent" onClick={() => setIsKycOpen(true)}>
                  Start/Update KYC
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="beneficiaries">
            <BeneficiariesTab />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsTab />
          </TabsContent>

          <TabsContent value="claims">
            <ClaimsTab />
          </TabsContent>

          <TabsContent value="reimbursements">
            <ReimbursementsTab />
          </TabsContent>

          <TabsContent value="appeals">
            <AppealsTab />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>
        </Tabs>
      </div>

      <NotificationsPanel open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
      <KycWizard open={isKycOpen} onOpenChange={setIsKycOpen} onSubmit={() => { /* mock */ }} />
    </div>
  )
}
