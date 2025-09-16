"use client"

import { AuthGuard } from "@/components/auth-guard"
import { UserDashboard } from "@/components/user-dashboard"

export default function DashboardPage() {
  return (
    <AuthGuard requiredRole="member">
      <UserDashboard />
    </AuthGuard>
  )
}
