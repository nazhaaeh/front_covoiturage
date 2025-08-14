import { NavLink } from "react-router-dom";
import { 
  Home, 
  Search, 
  Plus, 
  MessageCircle, 
  User,
  Calendar,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Proposer un trajet", href: "/create", icon: Plus },
  { name: "Mes trajets", href: "/trips", icon: Calendar },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Profile", href: "/profile", icon: User },
];

export function Navigation() {
  return (
    <nav className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:pt-16">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-card border-r">
        <div className="flex flex-col flex-grow px-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  <item.icon 
                    className="mr-3 h-5 w-5 flex-shrink-0" 
                    aria-hidden="true" 
                  />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        
      </div>
    </nav>
  );
}

// Mobile Navigation
export function MobileNavigation() {
  const quickNavItems = navigationItems.slice(0, 5); // First 5 items for mobile

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t">
      <div className="grid grid-cols-5 h-16">
        {quickNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}