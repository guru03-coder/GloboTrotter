import { Link } from "react-router-dom";
import { Globe, Compass, ArrowRight, Sparkles, Map, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import heroImage from "@/assets/india-hero.jpg";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { TravelNews } from "@/components/TravelNews";
import { AIItineraryGenerator } from "@/components/AIItineraryGenerator";
import { InteractiveMap } from "@/components/InteractiveMap";
import { TravelJournal } from "@/components/TravelJournal";

const features = [
  {
    icon: Map,
    title: "Smart Itineraries",
    description: "AI-powered trip planning for India's diverse destinations with personalized schedules"
  },
  {
    icon: Sparkles,
    title: "Curated Experiences",
    description: "Discover hidden gems from Kerala backwaters to Himalayan peaks"
  },
  {
    icon: Users,
    title: "Travel Community",
    description: "Connect with fellow travelers exploring Incredible India"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 md:px-12">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-foreground">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="glow">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-12 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Sparkles size={16} />
              Your Indian adventure begins here
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              Travel across
              <span className="block gradient-text">all features</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Discover India's incredible diversity with personalized travel planning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register">
                <Button variant="glow" size="xl" className="w-full sm:w-auto gap-2">
                  Start Planning
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2">
                  <Globe size={20} />
                  Explore Destinations
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-2xl" />
              <img
                src={heroImage}
                alt="Incredible India"
                className="relative rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
              />

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 glass-card p-4 rounded-2xl animate-float shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Globe className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">29+</p>
                    <p className="text-xs text-muted-foreground">States</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-2xl animate-float shadow-lg" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Compass className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">500+</p>
                    <p className="text-xs text-muted-foreground">Destinations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>


        {/* Travel Toolkit Section */}
        <div className="mt-32 animate-slide-up" style={{ animationDelay: "0.7s" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Travel <span className="gradient-text">Toolkit</span></h2>
            <p className="text-muted-foreground">Everything you need for your journey in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Visual Map - Spans 8 cols */}
            <div className="md:col-span-8 min-h-[400px]">
              <InteractiveMap />
            </div>

            {/* Side Widgets - Spans 4 cols */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <CurrencyConverter />
              <AIItineraryGenerator />
            </div>

            {/* Bottom Row */}
            <div className="md:col-span-6 h-[400px]">
              <TravelNews />
            </div>
            <div className="md:col-span-6 h-[400px]">
              <TravelJournal />
            </div>
          </div>
        </div>
      </main >
    </div >
  );
};

export default Index;
