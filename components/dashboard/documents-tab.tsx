'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, Trash2 } from 'lucide-react'

interface DocItem {
  id: string
  name: string
  type: 'KYC' | 'Claim' | 'Other'
  uploadedAt: string
  sizeKB: number
}

export function DocumentsTab() {
  const [docs, setDocs] = useState<DocItem[]>([
    { id: '1', name: 'passport.pdf', type: 'KYC', uploadedAt: 'Mar 20, 2024', sizeKB: 320 },
    { id: '2', name: 'medical-receipt.pdf', type: 'Claim', uploadedAt: 'Mar 15, 2024', sizeKB: 210 },
  ])

  const [newDocType, setNewDocType] = useState('KYC')

  const handleAddMock = () => {
    const id = Date.now().toString()
    setDocs([{ id, name: `document-${id}.pdf`, type: newDocType as DocItem['type'], uploadedAt: 'Just now', sizeKB: 123 }, ...docs])
  }

  const handleDelete = (id: string) => setDocs(docs.filter(d => d.id !== id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Documents</h2>
          <p className="text-muted-foreground">Upload and manage your supporting documents</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Label htmlFor="docType" className="text-xs">Type</Label>
            <Input id="docType" value={newDocType} onChange={(e) => setNewDocType(e.target.value)} className="h-8 w-28" />
          </div>
          <Button onClick={handleAddMock}>
            <Upload className="h-4 w-4 mr-2" />
            Mock Upload
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Your Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {docs.map(doc => (
              <div key={doc.id} className="p-3 border border-border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><FileText className="h-4 w-4 text-primary" /></div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">Uploaded {doc.uploadedAt} • {doc.sizeKB}KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{doc.type}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {docs.length === 0 && (
              <div className="text-center text-sm text-muted-foreground p-6">No documents uploaded yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


