import { useState } from "react"; 
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Plus, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correction icône marker Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function CreateTrip() {
  const navigate = useNavigate();

  // ----------------- State -----------------
  const [tripData, setTripData] = useState({
    pointDepart: "",
    pointArrivee: "",
    date: "",
    time: "",
    placesDisponibles: "1",
    prix: "",
    isRecurring: false,
    notes: "",
    matriculeCar: "",
    departCoords: { lat: 34.020882, lng: -6.841650 },
    arriveeCoords: { lat: 34.020882, lng: -6.841650 },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // ----------------- Géocodage -----------------
  const geocodeAddress = async (addr: string, type: "depart" | "arrivee") => {
    if (!addr) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      if (type === "depart") setTripData({ ...tripData, pointDepart: addr, departCoords: coords });
      else setTripData({ ...tripData, pointArrivee: addr, arriveeCoords: coords });
    }
  };

  const reverseGeocode = async (lat: number, lng: number, type: "depart" | "arrivee") => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    if (data.display_name) {
      if (type === "depart") setTripData({ ...tripData, pointDepart: data.display_name, departCoords: { lat, lng } });
      else setTripData({ ...tripData, pointArrivee: data.display_name, arriveeCoords: { lat, lng } });
    }
  };

  function MapClickHandler({ type }: { type: "depart" | "arrivee" }) {
    useMapEvents({
      click(e) {
        reverseGeocode(e.latlng.lat, e.latlng.lng, type);
      },
    });
    return null;
  }

  // ----------------- Helpers -----------------
  const toLatLng = (coords: { lat: number; lng: number }): [number, number] => [coords.lat, coords.lng];

  // ----------------- Navigation -----------------
  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // ----------------- Submit -----------------
  const timeWithSeconds =
    tripData.time?.length === 5 ? `${tripData.time}:00` : tripData.time;

  const submitTrip = async () => {
    try {
      const payload = {
        pointDepart: tripData.pointDepart,
        pointArrivee: tripData.pointArrivee,
        dateDepart: `${tripData.date}T${timeWithSeconds}`,
        isRecurring: tripData.isRecurring,
        placesDisponibles: parseInt(tripData.placesDisponibles, 10),
        prix: parseFloat(tripData.prix),
        matriculeCar: tripData.matriculeCar,
        conducteurId: "12", // TODO: remplacer par l'ID de l'utilisateur connecté
        deletedOrnotdispo: 0,
      };

      const res = await fetch("https://localhost:7228/api/Trajet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("POST /trajet FAILED", res.status, res.statusText, text);
        alert(`Erreur (${res.status}) lors de la publication du trajet.`);
        return;
      }

      navigate("/home");
    } catch (err) {
      console.error("Network/JS error:", err);
      alert("Impossible de contacter le serveur.");
    }
  };

  // ----------------- Step rendering -----------------
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Détails du trajet</h2>
            <div className="space-y-4">
              {/* Point de départ */}
              <div>
                <Label>Point de départ</Label>
                <Input
                  value={tripData.pointDepart}
                  onChange={(e) => setTripData({ ...tripData, pointDepart: e.target.value })}
                  onBlur={() => geocodeAddress(tripData.pointDepart, "depart")}
                  placeholder="Lieu de départ"
                />
                <MapContainer
                  center={toLatLng(tripData.departCoords)}
                  zoom={13}
                  style={{ height: "200px", marginTop: "10px" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler type="depart" />
                  <Marker position={toLatLng(tripData.departCoords)} />
                </MapContainer>
              </div>

              {/* Destination */}
              <div>
                <Label>Destination</Label>
                <Input
                  value={tripData.pointArrivee}
                  onChange={(e) => setTripData({ ...tripData, pointArrivee: e.target.value })}
                  onBlur={() => geocodeAddress(tripData.pointArrivee, "arrivee")}
                  placeholder="Lieu d'arrivée"
                />
                <MapContainer
                  center={toLatLng(tripData.arriveeCoords)}
                  zoom={13}
                  style={{ height: "200px", marginTop: "10px" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler type="arrivee" />
                  <Marker position={toLatLng(tripData.arriveeCoords)} />
                </MapContainer>
              </div>

              {/* Date & Heure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={tripData.date}
                    onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Heure de départ</Label>
                  <Input
                    type="time"
                    value={tripData.time}
                    onChange={(e) => setTripData({ ...tripData, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={tripData.isRecurring}
                  onCheckedChange={(checked) =>
                    setTripData({ ...tripData, isRecurring: checked })
                  }
                />
                <Label>Rendre ce trajet récurrent</Label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Véhicule & Capacité</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Véhicule</Label>
                <Input
                  type="text"
                  value={tripData.matriculeCar}
                  onChange={(e) => setTripData({ ...tripData, matriculeCar: e.target.value })}
                  placeholder="Véhicule"
                />
              </div>
              <div>
                <Label>Places disponibles</Label>
                <Input
                  type="number"
                  value={tripData.placesDisponibles}
                  onChange={(e) =>
                    setTripData({ ...tripData, placesDisponibles: e.target.value })
                  }
                  placeholder="Places disponibles"
                />
              </div>
              <div>
                <Label>Prix par passager</Label>
                <Input
                  type="number"
                  value={tripData.prix}
                  onChange={(e) => setTripData({ ...tripData, prix: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Résumé du trajet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>De:</strong> {tripData.pointDepart}</p>
                <p><strong>À:</strong> {tripData.pointArrivee}</p>
                <p><strong>Date:</strong> {tripData.date}</p>
                <p><strong>Heure:</strong> {tripData.time}</p>
                <p><strong>Récurrent:</strong> {tripData.isRecurring ? "Oui" : "Non"}</p>
                <p><strong>Places:</strong> {tripData.placesDisponibles}</p>
                <p><strong>Prix:</strong> {tripData.prix} DH</p>
                <p><strong>Véhicule:</strong> {tripData.matriculeCar}</p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  // ----------------- Render -----------------
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Proposer un trajet</h1>
          <p className="text-muted-foreground">Partagez votre trajet avec d'autres étudiants</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="mr-2 h-5 w-5" /> Étape {currentStep} sur {totalSteps}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Saisissez les détails de votre trajet"}
              {currentStep === 2 && "Informations sur le véhicule et tarification"}
              {currentStep === 3 && "Vérifiez et publiez votre trajet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Précédent
              </Button>
              {currentStep < totalSteps ? (
                <Button onClick={handleNext} variant="gradient">
                  Suivant <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="gradient" onClick={submitTrip}>
                  <Plus className="mr-2 h-4 w-4" /> Publier le trajet
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
