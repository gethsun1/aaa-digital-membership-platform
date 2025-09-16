import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, FileText, Clock, CheckCircle, ArrowRight } from "lucide-react"
import { Brand } from "@/components/brand"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Brand />
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Member Benefits Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            AAA Member Benefits Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            <span className="text-primary font-semibold">Secure.</span>{" "}
            <span className="text-primary font-semibold">Transparent.</span>{" "}
            <span className="text-primary font-semibold">Accountable.</span>
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
            Manage membership, submit claims, track reimbursements, and access benefits in one secure, transparent hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                Member Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                New Member Registration
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose AAA?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience the future of membership management with our comprehensive digital platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Membership Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Easily manage your membership status, renewal dates, beneficiaries, and payment history all in one
                  secure location.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Claims Processing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Submit claims digitally with document upload, track approval status in real-time, and receive instant
                  notifications on updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Transparent Reimbursements</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Monitor active reimbursements with countdown timers, download receipts, and access complete payment
                  history with full transparency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Data Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your personal and financial information is protected with enterprise-grade security and encryption
                  protocols.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-Time Updates</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive instant notifications for membership renewals, claim approvals, and important deadlines via
                  email and in-app alerts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Appeals Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Submit appeals with supporting documentation and track the review process with complete visibility
                  into decision timelines.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            Join thousands of members who trust AAA for their membership and claims management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                Access Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Create New Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Brand />
              <p className="text-sm text-muted-foreground">Member Benefits Platform</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-primary">Terms</Link>
              <span>•</span>
              <a href="mailto:support@aaa-platform.com" className="hover:text-primary">support@aaa-platform.com</a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left text-xs text-muted-foreground">
            © {new Date().getFullYear()} AAA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
