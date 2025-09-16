"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, RefreshCw, Bell, DollarSign, Shield } from "lucide-react"

export function ConfigurationTab() {
  const [config, setConfig] = useState({
    reimbursementPeriod: "30",
    autoApprovalLimit: "500",
    notificationsEnabled: true,
    emailReminders: true,
    smsNotifications: false,
    maintenanceMode: false,
    maxClaimAmount: "10000",
    processingTimeTarget: "3",
    welcomeMessage: "Welcome to AAA Digital Membership Platform",
    supportEmail: "support@aaa-platform.com",
    systemTimezone: "UTC-5",
  })

  const handleConfigChange = (key: string, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const saveConfiguration = () => {
    console.log("Saving configuration:", config)
    // Mock save functionality
  }

  const resetToDefaults = () => {
    setConfig({
      reimbursementPeriod: "30",
      autoApprovalLimit: "500",
      notificationsEnabled: true,
      emailReminders: true,
      smsNotifications: false,
      maintenanceMode: false,
      maxClaimAmount: "10000",
      processingTimeTarget: "3",
      welcomeMessage: "Welcome to AAA Digital Membership Platform",
      supportEmail: "support@aaa-platform.com",
      systemTimezone: "UTC-5",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Configuration</h2>
          <p className="text-muted-foreground">Configure system parameters and settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={saveConfiguration}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Reimbursement Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Reimbursement Settings
          </CardTitle>
          <CardDescription>Configure reimbursement periods and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reimbursementPeriod">Reimbursement Period (days)</Label>
              <Input
                id="reimbursementPeriod"
                value={config.reimbursementPeriod}
                onChange={(e) => handleConfigChange("reimbursementPeriod", e.target.value)}
                placeholder="30"
              />
              <p className="text-xs text-muted-foreground">
                Number of days members have to claim approved reimbursements
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="autoApprovalLimit">Auto-Approval Limit ($)</Label>
              <Input
                id="autoApprovalLimit"
                value={config.autoApprovalLimit}
                onChange={(e) => handleConfigChange("autoApprovalLimit", e.target.value)}
                placeholder="500"
              />
              <p className="text-xs text-muted-foreground">Claims under this amount are automatically approved</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxClaimAmount">Maximum Claim Amount ($)</Label>
              <Input
                id="maxClaimAmount"
                value={config.maxClaimAmount}
                onChange={(e) => handleConfigChange("maxClaimAmount", e.target.value)}
                placeholder="10000"
              />
              <p className="text-xs text-muted-foreground">Maximum amount allowed for a single claim</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="processingTimeTarget">Processing Time Target (days)</Label>
              <Input
                id="processingTimeTarget"
                value={config.processingTimeTarget}
                onChange={(e) => handleConfigChange("processingTimeTarget", e.target.value)}
                placeholder="3"
              />
              <p className="text-xs text-muted-foreground">Target processing time for claims review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notificationsEnabled">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable or disable all system notifications</p>
              </div>
              <Switch
                id="notificationsEnabled"
                checked={config.notificationsEnabled}
                onCheckedChange={(checked) => handleConfigChange("notificationsEnabled", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailReminders">Email Reminders</Label>
                <p className="text-sm text-muted-foreground">Send email reminders for renewals and deadlines</p>
              </div>
              <Switch
                id="emailReminders"
                checked={config.emailReminders}
                onCheckedChange={(checked) => handleConfigChange("emailReminders", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send SMS notifications for urgent updates</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={config.smsNotifications}
                onCheckedChange={(checked) => handleConfigChange("smsNotifications", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            System Settings
          </CardTitle>
          <CardDescription>General system configuration and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                value={config.supportEmail}
                onChange={(e) => handleConfigChange("supportEmail", e.target.value)}
                placeholder="support@aaa-platform.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemTimezone">System Timezone</Label>
              <Select
                value={config.systemTimezone}
                onValueChange={(value) => handleConfigChange("systemTimezone", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Textarea
              id="welcomeMessage"
              value={config.welcomeMessage}
              onChange={(e) => handleConfigChange("welcomeMessage", e.target.value)}
              placeholder="Welcome message for new members..."
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Enable maintenance mode to restrict system access</p>
            </div>
            <Switch
              id="maintenanceMode"
              checked={config.maintenanceMode}
              onCheckedChange={(checked) => handleConfigChange("maintenanceMode", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Settings
          </CardTitle>
          <CardDescription>Configure security and access control settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Security Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>SSL Certificate</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <span className="text-green-600 font-medium">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Encryption</span>
                <span className="text-green-600 font-medium">AES-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Security Audit</span>
                <span className="text-muted-foreground">March 1, 2024</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
