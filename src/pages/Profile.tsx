import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  Star,
  Shield,
  Edit,
  Camera,
  Calendar,
  Award
} from "lucide-react";

export default function Profile() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Computer Science Student</p>
                <div className="flex items-center justify-center space-x-2">
                  <Badge variant="secondary">
                    <Shield className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                  <Badge variant="outline">
                    <Star className="mr-1 h-3 w-3" />
                    4.8
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">127</div>
                  <div className="text-sm text-muted-foreground">Trips</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">89%</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Recent Achievements</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-warning" />
                    <span className="text-sm">Eco Warrior - 50+ shared rides</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-warning" />
                    <span className="text-sm">Top Rated Driver</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">Regular Commuter</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic profile details</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value="John" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value="Doe" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" value="john.doe@university.edu" readOnly className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" value="+1 (555) 123-4567" readOnly className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="address" value="123 University Ave, College Town, ST 12345" readOnly className="pl-10" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Vehicle Information</CardTitle>
                    <CardDescription>Details about your vehicle for ride sharing</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" value="Honda" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" value="Civic" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" value="2020" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" value="Blue" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input id="licensePlate" value="ABC-1234" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seats">Total Seats</Label>
                    <Input id="seats" value="4" readOnly />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                  <Car className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Vehicle Verified</p>
                    <p className="text-sm text-muted-foreground">Your vehicle has been verified by our team</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your ride sharing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Music Preference</Label>
                    <Input value="Pop, Rock" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Smoking</Label>
                    <Input value="No smoking" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Pets</Label>
                    <Input value="Pets welcome" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Conversation</Label>
                    <Input value="Moderate chatting" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}