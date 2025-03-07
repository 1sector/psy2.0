import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Users, ClipboardCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Professional Psychology Platform
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-muted-foreground sm:text-2xl md:mt-5 md:max-w-3xl">
              Connect with professional psychologists, take assessments, and track your progress in one place.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="p-6">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Support</h3>
              <p className="text-muted-foreground">
                Connect with licensed psychologists for personalized support and guidance.
              </p>
            </Card>
            <Card className="p-6">
              <ClipboardCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Assessment Tools</h3>
              <p className="text-muted-foreground">
                Access professional psychological assessments and track your progress over time.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security and privacy measures.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}