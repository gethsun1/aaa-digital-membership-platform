"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Users, Plus, Edit, Trash2, Phone, Mail } from "lucide-react"

interface Beneficiary {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  percentage: number
  status: "Active" | "Inactive"
}

export function BeneficiariesTab() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: "1",
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 123-4567",
      email: "jane.doe@example.com",
      percentage: 60,
      status: "Active",
    },
    {
      id: "2",
      name: "John Doe Jr.",
      relationship: "Child",
      phone: "+1 (555) 987-6543",
      email: "john.jr@example.com",
      percentage: 40,
      status: "Active",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    percentage: 0,
  })

  const handleAddBeneficiary = () => {
    const beneficiary: Beneficiary = {
      id: Date.now().toString(),
      ...newBeneficiary,
      status: "Active",
    }
    setBeneficiaries([...beneficiaries, beneficiary])
    setNewBeneficiary({ name: "", relationship: "", phone: "", email: "", percentage: 0 })
    setIsAddDialogOpen(false)
  }

  const totalPercentage = beneficiaries.reduce((sum, b) => sum + b.percentage, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Beneficiaries</h2>
          <p className="text-muted-foreground">Manage your beneficiaries and their benefit allocations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Beneficiary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Beneficiary</DialogTitle>
              <DialogDescription>Add a new beneficiary to your membership account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newBeneficiary.name}
                  onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={newBeneficiary.relationship}
                  onValueChange={(value) => setNewBeneficiary({ ...newBeneficiary, relationship: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newBeneficiary.phone}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage</Label>
                  <Input
                    id="percentage"
                    type="number"
                    min="0"
                    max="100"
                    value={newBeneficiary.percentage}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, percentage: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newBeneficiary.email}
                  onChange={(e) => setNewBeneficiary({ ...newBeneficiary, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddBeneficiary} className="flex-1">
                  Add Beneficiary
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Beneficiary Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{beneficiaries.length}</p>
              <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalPercentage}%</p>
              <p className="text-sm text-muted-foreground">Allocated Percentage</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{100 - totalPercentage}%</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
          {totalPercentage !== 100 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Warning: Total allocation is {totalPercentage}%. Please ensure it adds up to 100%.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Beneficiaries List */}
      <div className="grid gap-4">
        {beneficiaries.map((beneficiary) => (
          <Card key={beneficiary.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{beneficiary.name}</h3>
                    <p className="text-sm text-muted-foreground">{beneficiary.relationship}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{beneficiary.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{beneficiary.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{beneficiary.percentage}%</p>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {beneficiary.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
