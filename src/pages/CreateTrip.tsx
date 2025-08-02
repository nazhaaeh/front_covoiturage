import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Calendar,
  Clock,
  Users,
  DollarSign,
  Car,
  Plus,
  ArrowRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function CreateTrip() {
  const [tripData, setTripData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    seats: "1",
    price: "",
    recurring: false,
    notes: "",
    vehicle: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="origin">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="origin"
                      placeholder="Where are you starting from?"
                      value={tripData.origin}
                      onChange={(e) => setTripData({...tripData, origin: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="destination"
                      placeholder="Where are you going?"
                      value={tripData.destination}
                      onChange={(e) => setTripData({...tripData, destination: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={tripData.date}
                      onChange={(e) => setTripData({...tripData, date: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Departure Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={tripData.time}
                      onChange={(e) => setTripData({...tripData, time: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center space-x-2">
                <Switch
                  id="recurring"
                  checked={tripData.recurring}
                  onCheckedChange={(checked) => setTripData({...tripData, recurring: checked})}
                />
                <Label htmlFor="recurring">Make this a recurring trip</Label>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Vehicle & Capacity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Select value={tripData.vehicle} onValueChange={(value) => setTripData({...tripData, vehicle: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honda-civic">Honda Civic 2020</SelectItem>
                      <SelectItem value="toyota-camry">Toyota Camry 2021</SelectItem>
                      <SelectItem value="nissan-sentra">Nissan Sentra 2019</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seats">Available Seats</Label>
                  <Select value={tripData.seats} onValueChange={(value) => setTripData({...tripData, seats: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="How many passengers?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 passenger</SelectItem>
                      <SelectItem value="2">2 passengers</SelectItem>
                      <SelectItem value="3">3 passengers</SelectItem>
                      <SelectItem value="4">4 passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Passenger</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={tripData.price}
                      onChange={(e) => setTripData({...tripData, price: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Trip Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information for passengers..."
                    value={tripData.notes}
                    onChange={(e) => setTripData({...tripData, notes: e.target.value})}
                    className="min-h-24"
                  />
                </div>
              </div>
            </div>
            
            {/* Trip Summary */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">From:</span>
                    <p className="font-medium">{tripData.origin || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">To:</span>
                    <p className="font-medium">{tripData.destination || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date & Time:</span>
                    <p className="font-medium">{tripData.date && tripData.time ? `${tripData.date} at ${tripData.time}` : "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Available Seats:</span>
                    <p className="font-medium">{tripData.seats} passenger{tripData.seats !== "1" ? "s" : ""}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <p className="font-medium">${tripData.price || "0"} per passenger</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Vehicle:</span>
                    <p className="font-medium">{tripData.vehicle || "Not specified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Offer a Ride</h1>
          <p className="text-muted-foreground">
            Share your journey and help fellow students get around campus
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-8 h-0.5 ml-2 ${
                  step < currentStep ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="mr-2 h-5 w-5" />
              Step {currentStep} of {totalSteps}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Enter your trip details"}
              {currentStep === 2 && "Vehicle information and pricing"}
              {currentStep === 3 && "Review and publish your trip"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={handleNext} variant="gradient">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Publish Trip
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}