"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Shield, Users, FileText, Scale, BarChart3, Settings, LogOut, Bell } from "lucide-react"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPanel } from "@/components/notifications-panel"
import { useAuth } from "@/components/auth-guard"
import { MemberManagementTab } from "@/components/admin/member-management-tab"
import { ClaimsProcessingTab } from "@/components/admin/claims-processing-tab"
import { AppealsManagementTab } from "@/components/admin/appeals-management-tab"
import { ReportsTab } from "@/components/admin/reports-tab"
import { ConfigurationTab } from "@/components/admin/configuration-tab"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("members")
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

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
                <p className="text-sm text-muted-foreground">Admin Portal</p>
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
                  <p className="text-xs text-muted-foreground">{user.adminRole}</p>
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
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {user.adminRole}
            </Badge>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Members</span>
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Claims</span>
            </TabsTrigger>
            <TabsTrigger value="appeals" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">Appeals</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <MemberManagementTab />
          </TabsContent>

          <TabsContent value="claims">
            <ClaimsProcessingTab />
          </TabsContent>

          <TabsContent value="appeals">
            <AppealsManagementTab />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>

          <TabsContent value="config">
            <ConfigurationTab />
          </TabsContent>
        </Tabs>
      </div>
      <NotificationsPanel open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
    </div>
  )
}
