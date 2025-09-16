'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, CheckCircle, Clock, XCircle, Mail } from 'lucide-react'

interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  date: string
  read: boolean
}

export function NotificationsPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [items, setItems] = useState<NotificationItem[]>([
    { id: '1', type: 'warning', title: 'Membership renewal due', message: 'Your renewal is due in 14 days.', date: 'Today', read: false },
    { id: '2', type: 'success', title: 'Claim approved', message: 'Claim CLM-2024-001 approved.', date: 'Yesterday', read: false },
    { id: '3', type: 'info', title: 'Supporting documents due', message: 'Upload missing document for claim CLM-2024-002.', date: '2 days ago', read: true },
  ])

  const markAllRead = () => setItems(items.map(i => ({ ...i, read: true })))
  const unreadCount = items.filter(i => !i.read).length

  const iconFor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'warning':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Mail className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary">{unreadCount} new</Badge>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button size="sm" variant="outline" className="bg-transparent" onClick={markAllRead}>Mark all as read</Button>
          </div>
          {items.map(item => (
            <div key={item.id} className="p-3 border border-border rounded-lg flex items-start gap-3">
              <div className="mt-0.5">{iconFor(item.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                {item.message && <p className="text-xs text-muted-foreground mt-1">{item.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center text-sm text-muted-foreground p-6">No notifications</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}


