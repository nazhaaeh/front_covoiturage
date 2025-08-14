import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Plus, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
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
    matriculeCar: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();

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
        dateDepart: `${tripData.date}T${timeWithSeconds}`, // ISO
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

      navigate("/home"); // redirection vers la page Home
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Point de départ</Label>
                <Input
                  value={tripData.pointDepart}
                  onChange={(e) =>
                    setTripData({ ...tripData, pointDepart: e.target.value })
                  }
                  placeholder="Lieu de départ"
                />
              </div>
              <div className="space-y-2">
                <Label>Destination</Label>
                <Input
                  value={tripData.pointArrivee}
                  onChange={(e) =>
                    setTripData({ ...tripData, pointArrivee: e.target.value })
                  }
                  placeholder="Lieu d'arrivée"
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={tripData.date}
                  onChange={(e) =>
                    setTripData({ ...tripData, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Heure de départ</Label>
                <Input
                  type="time"
                  value={tripData.time}
                  onChange={(e) =>
                    setTripData({ ...tripData, time: e.target.value })
                  }
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
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Véhicule & Capacité
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Véhicule</Label>
                <Input
                  type="text"
                  value={tripData.matriculeCar}
                  onChange={(e) =>
                    setTripData({ ...tripData, matriculeCar: e.target.value })
                  }
                  placeholder="Véhicule"
                />
              </div>
              <div className="space-y-2">
                <Label>Places disponibles</Label>
                <Input
                  type="number"
                  value={tripData.placesDisponibles}
                  onChange={(e) =>
                    setTripData({
                      ...tripData,
                      placesDisponibles: e.target.value,
                    })
                  }
                  placeholder="Places disponibles"
                />
              </div>
              <div className="space-y-2">
                <Label>Prix par passager</Label>
                <Input
                  type="number"
                  value={tripData.prix}
                  onChange={(e) =>
                    setTripData({ ...tripData, prix: e.target.value })
                  }
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
              <CardContent className="space-y-4">
                <p>
                  <strong>De:</strong> {tripData.pointDepart}
                </p>
                <p>
                  <strong>À:</strong> {tripData.pointArrivee}
                </p>
                <p>
                  <strong>Date:</strong> {tripData.date}
                </p>
                <p>
                  <strong>Heure:</strong> {tripData.time}
                </p>
                <p>
                  <strong>Récurrent:</strong>{" "}
                  {tripData.isRecurring ? "Oui" : "Non"}
                </p>
                <p>
                  <strong>Places:</strong> {tripData.placesDisponibles}
                </p>
                <p>
                  <strong>Prix:</strong> {tripData.prix} DH
                </p>
                <p>
                  <strong>Véhicule:</strong> {tripData.matriculeCar}
                </p>
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
          <p className="text-muted-foreground">
            Partagez votre trajet avec d'autres étudiants
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="mr-2 h-5 w-5" /> Étape {currentStep} sur{" "}
              {totalSteps}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Saisissez les détails de votre trajet"}
              {currentStep === 2 &&
                "Informations sur le véhicule et tarification"}
              {currentStep === 3 && "Vérifiez et publiez votre trajet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
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
