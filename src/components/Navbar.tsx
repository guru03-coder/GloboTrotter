import { Link, useLocation } from "react-router-dom";
import { Home, Map, Plane, User, Calendar, Users, Search, FileText, Settings, LogOut, Shield } from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Map, label: "My Trips", href: "/trips" },
  { icon: Plane, label: "Create Trip", href: "/create-trip" },
  { icon: FileText, label: "Build Itinerary", href: "/build-itinerary" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: User, label: "Profile", href: "/profile" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard">
            <Logo size="sm" />
          </Link>

          {/* Nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary/10 text-primary shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              title="Admin Panel"
            >
              <Shield size={20} />
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              <Settings size={20} />
            </Link>
            <Link
              to="/login"
              className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
