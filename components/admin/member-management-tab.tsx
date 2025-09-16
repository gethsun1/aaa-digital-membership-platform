"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Search, UserCheck, UserX, Eye, Edit, Mail, Phone } from "lucide-react"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  membershipId: string
  status: "Active" | "Suspended" | "Inactive"
  joinDate: string
  renewalDate: string
  membershipType: string
  totalClaims: number
  totalPaid: string
}

export function MemberManagementTab() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      membershipId: "AAA-2024-001",
      status: "Active",
      joinDate: "Jan 15, 2020",
      renewalDate: "Jan 15, 2025",
      membershipType: "Premium Individual",
      totalClaims: 12,
      totalPaid: "$1,196.00",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      membershipId: "AAA-2024-002",
      status: "Active",
      joinDate: "Mar 22, 2021",
      renewalDate: "Mar 22, 2025",
      membershipType: "Family Plan",
      totalClaims: 8,
      totalPaid: "$2,388.00",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1 (555) 456-7890",
      membershipId: "AAA-2024-003",
      status: "Suspended",
      joinDate: "Jul 10, 2019",
      renewalDate: "Jul 10, 2024",
      membershipType: "Basic Individual",
      totalClaims: 3,
      totalPaid: "$597.00",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || member.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (memberId: string, newStatus: Member["status"]) => {
    setMembers(members.map((member) => (member.id === memberId ? { ...member, status: newStatus } : member)))
  }

  const getStatusColor = (status: Member["status"]) => {
    switch (status) {
      case "Active":
        return "bg-primary/10 text-primary"
      case "Suspended":
        return "bg-red-100 text-red-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Member Management</h2>
          <p className="text-muted-foreground">Manage member accounts and status</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{members.filter((m) => m.status === "Active").length}</p>
                <p className="text-xs text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserX className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{members.filter((m) => m.status === "Suspended").length}</p>
                <p className="text-xs text-muted-foreground">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{members.length}</p>
                <p className="text-xs text-muted-foreground">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{members.reduce((sum, m) => sum + m.totalClaims, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Claims</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Members ({filteredMembers.length})
          </CardTitle>
          <CardDescription>Manage member accounts and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      <AvatarInitials name={member.name} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.membershipId}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{member.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{member.membershipType}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.totalClaims} claims • {member.totalPaid}
                    </p>
                    <p className="text-xs text-muted-foreground">Renews: {member.renewalDate}</p>
                  </div>

                  <Badge className={getStatusColor(member.status)}>{member.status}</Badge>

                  <div className="flex gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedMember(member)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Member Details</DialogTitle>
                          <DialogDescription>Detailed information for {member.name}</DialogDescription>
                        </DialogHeader>
                        {selectedMember && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Name</Label>
                                <p className="text-sm text-muted-foreground">{selectedMember.name}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Membership ID</Label>
                                <p className="text-sm text-muted-foreground">{selectedMember.membershipId}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Email</Label>
                                <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Phone</Label>
                                <p className="text-sm text-muted-foreground">{selectedMember.phone}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Join Date</Label>
                                <p className="text-sm text-muted-foreground">{selectedMember.joinDate}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Renewal Date</Label>
                                <p className="text-sm text-muted-foreground">{selectedMember.renewalDate}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>

                    {member.status === "Active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(member.id, "Suspended")}
                        className="text-red-600 hover:text-red-700"
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(member.id, "Active")}
                        className="text-green-600 hover:text-green-700"
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
