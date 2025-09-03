import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search, 
  User, 
  MessageCircle, 
  Settings,
  LogOut,
  Car
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/services/conducteurService";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3); // Mock notification count
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Récupère l'utilisateur connecté depuis l'API
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      getUserById(id)
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleProfile = () => {
    navigate("/profile"); // redirection vers la page Profil
  };

  const handleLogout = () => {
    // Supprime les infos de session
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login"); // redirection vers Login
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CampusRide
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations, drivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-medium min-w-[1.25rem]"
                variant="destructive"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
               <DropdownMenuLabel className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {user ? `${user.prenom} ${user.nom}` : "Utilisateur"}
              </DropdownMenuLabel>
             
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
