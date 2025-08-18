import { Card, CardContent } from "../Card";
import { 
  Send, 
  CreditCard, 
  Shield, 
  BarChart3, 
  Users, 
  Smartphone,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Instant Transfers",
    description: "Send money to anyone in seconds with real-time processing and confirmation.",
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
    <section id="features" className="relative py-24 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 animate-fade-in">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl relative sm:text-5xl lg:text-6xl 
          font-bold text-[#0891b2] mb-6">
            Everything You Need for{" "}
            <span className="text-primary">Modern Payments</span>
            <div
                className="absolute bottom-0 left-4 right-4 h-1 rounded-full"
                style={{ backgroundColor: "#3b82f6" }}
              />
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            From instant transfers to detailed analytics, our platform provides all the tools 
            you need to manage your finances with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group relative overflow-hidden 
              border border-border/40 
              bg-background/60 backdrop-blur-xl 
              rounded-2xl shadow-lg
              transition-all duration-500
              hover:shadow-2xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Subtle gradient highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <CardContent className="p-8 relative z-10">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center 
                  w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 
                  transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {feature.category}
                </span>
                
                <h3 className="mt-2 text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-sm">
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
