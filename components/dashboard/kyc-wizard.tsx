'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload } from 'lucide-react'

export function KycWizard({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (o: boolean) => void; onSubmit: () => void }) {
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>KYC Verification</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setActiveTab('identity')}>Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="identity" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID type</Label>
              <Input id="idType" placeholder="Passport / National ID" />
            </div>
            <div className="space-y-2">
              <Label>Upload ID</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('personal')}>Back</Button>
              <Button onClick={() => setActiveTab('address')}>Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="address" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Street, City, Country" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Proof of address</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Upload a recent utility bill or bank statement</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('identity')}>Back</Button>
              <Button onClick={() => { onSubmit(); onOpenChange(false) }}>Submit</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


