import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TripCard } from "@/components/dashboard/TripCard";
import { 
  Car, 
  Users, 
  MapPin, 
  TrendingUp,
  Plus,
  Search,
  Calendar,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-carpooling.jpg";

const mockStats = [
  {
    title: "Total Trips",
    value: 24,
    description: "This month",
    icon: Car,
    trend: { value: 12, label: "from last month" }
  },
  {
    title: "CO2 Saved",
    value: "156 kg",
    description: "Environmental impact",
    icon: TrendingUp,
    trend: { value: 23, label: "from last month" }
  },
  {
    title: "People Connected",
    value: 48,
    description: "Fellow students",
    icon: Users,
    trend: { value: 8, label: "from last month" }
  },
  {
    title: "Popular Route",
    value: "Campus → Downtown",
    description: "Most requested",
    icon: MapPin
  },
];

const mockTrips = [
  {
    id: "1",
    type: 'offered' as const,
    driver: {
      name: "Sarah Johnson",
      rating: 4.8,
      isVerified: true
    },
    origin: "Computer Science Building",
    destination: "Downtown Mall",
    datetime: new Date(2024, 7, 29, 14, 30),
    availableSeats: 2,
    totalSeats: 4,
    price: 8,
    status: 'upcoming' as const
  },
  {
    id: "2",
    type: 'booked' as const,
    driver: {
      name: "Mike Chen",
      rating: 4.9,
      isVerified: true
    },
    origin: "Student Dormitory",
    destination: "Airport",
    datetime: new Date(2024, 7, 30, 9, 0),
    availableSeats: 1,
    totalSeats: 3,
    price: 25,
    status: 'upcoming' as const
  }
];

const quickActions = [
  {
    title: "Find a Ride",
    description: "Search for available rides to your destination",
    icon: Search,
    action: "/search",
    variant: "gradient" as const
  },
  {
    title: "Offer a Ride",
    description: "Share your ride and earn while helping others",
    icon: Plus,
    action: "/create",
    variant: "secondary" as const
  },
  {
    title: "Schedule Recurring",
    description: "Set up regular trips for consistent routes",
    icon: Calendar,
    action: "/schedule",
    variant: "outline" as const
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="h-64 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold">Welcome to CampusRide</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Connect with fellow students and staff for smart, sustainable transportation across campus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Search className="mr-2 h-5 w-5" />
                Find a Ride
              </Button>
              <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm">
                <Plus className="mr-2 h-5 w-5" />
                Offer a Ride
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with these common tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-200">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button variant={action.variant} className="w-full">
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Trips */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Trips</CardTitle>
              <CardDescription>Your scheduled rides</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">New ride request</p>
                  <p className="text-xs text-muted-foreground">
                    Emma Wilson wants to join your trip to Downtown Mall
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 bg-secondary rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Trip completed</p>
                  <p className="text-xs text-muted-foreground">
                    Successfully completed trip with Mike Chen
                  </p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 bg-warning rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-muted-foreground">
                    $15 received for Airport trip
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}