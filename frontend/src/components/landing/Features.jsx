import { Card,CardContent } from "../Card";
import { 
  Send, 
  CreditCard, 
  Shield, 
  BarChart3, 
  Users, 
  Smartphone,
  Clock,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Instant Transfers",
    description: "Send money anywhere in the world in seconds with real-time processing and confirmation.",
    category: "Payments"
  },
  {
    icon: CreditCard,
    title: "Payment Requests",
    description: "Create and send professional payment requests with custom notes and due dates.",
    category: "Billing"
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit encryption, 2FA, and PCI DSS compliance keep your money safe.",
    category: "Security"
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Perfect for small businesses - manage multiple users and set spending limits.",
    category: "Business"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Full-featured mobile experience for payments on the go, anywhere, anytime.",
    category: "Mobile"
  },
  {
    icon: Clock,
    title: "Transaction History",
    description: "Complete audit trail with search, filters, and export capabilities for accounting.",
    category: "Management"
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary mb-6">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="block text-primary">Modern Payments</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From instant transfers to detailed analytics, our platform provides all the tools 
            you need to manage your finances with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-medium
              transition-all duration-300 hover:-translate-y-1
               border-border/50 hover:border-primary/30
               backdrop-blur-sm rounded-2xl
               bg-gradient-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="inline-flex items-center 
                  justify-center w-12 h-12 rounded-xl bg-primary/5 
                  group-hover:bg-primary/10 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {feature.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};