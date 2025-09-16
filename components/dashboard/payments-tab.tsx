"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Calendar, DollarSign } from "lucide-react"

interface Payment {
  id: string
  date: string
  description: string
  amount: string
  method: string
  status: "Completed" | "Pending" | "Failed"
  receiptUrl?: string
}

export function PaymentsTab() {
  const payments: Payment[] = [
    {
      id: "1",
      date: "Jan 15, 2024",
      description: "Annual Membership Renewal",
      amount: "$299.00",
      method: "Credit Card ****1234",
      status: "Completed",
      receiptUrl: "#",
    },
    {
      id: "2",
      date: "Dec 10, 2023",
      description: "Additional Coverage Premium",
      amount: "$49.99",
      method: "Credit Card ****1234",
      status: "Completed",
      receiptUrl: "#",
    },
    {
      id: "3",
      date: "Jan 15, 2023",
      description: "Annual Membership Renewal",
      amount: "$279.00",
      method: "Credit Card ****1234",
      status: "Completed",
      receiptUrl: "#",
    },
    {
      id: "4",
      date: "Aug 22, 2022",
      description: "Late Payment Fee",
      amount: "$25.00",
      method: "Credit Card ****1234",
      status: "Completed",
      receiptUrl: "#",
    },
  ]

  const totalPaid = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount.replace("$", "")), 0)

  const handleDownloadReceipt = (paymentId: string) => {
    // Mock download functionality
    console.log(`Downloading receipt for payment ${paymentId}`)
  }

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Total Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">${totalPaid.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Lifetime payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Last Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-foreground">{payments[0]?.date}</p>
            <p className="text-sm text-muted-foreground">{payments[0]?.amount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-foreground">Credit Card</p>
            <p className="text-sm text-muted-foreground">****1234</p>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              Update Method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment History
          </CardTitle>
          <CardDescription>Your complete payment history and receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{payment.description}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                    <p className="text-xs text-muted-foreground">{payment.method}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-foreground">{payment.amount}</p>
                    <Badge
                      variant={payment.status === "Completed" ? "secondary" : "destructive"}
                      className={
                        payment.status === "Completed" ? "bg-primary/10 text-primary" : "bg-red-100 text-red-800"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  {payment.status === "Completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadReceipt(payment.id)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-3 w-3" />
                      Receipt
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
