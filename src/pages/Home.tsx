import { Layout } from "@/components/layout/Layout";
import TripsList from "@/components/dashboard/TripList";
import { Car, Users, Calendar, MapPin, Plus } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-carpooling.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // TODO: remplace par l’ID réel du conducteur connecté (quand l’auth sera prête)
  const conducteurId = "12";
  const navigate = useNavigate();


  return (
    <Layout>
        {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="h-64 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="text-4xl font-bold">Bienvenue sur CampusRide</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Connectez-vous avec les étudiants et le personnel pour un transport
              intelligent et durable sur le campus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button
                size="lg"
                className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => navigate("/create")}
              >
                <Plus className="mr-2 h-5 w-5" />
                Proposer un trajet
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        
        {/* En-tête */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Consultez vos trajets publiés et vos statistiques rapides.
          </p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Trajets publiés" value="—" icon={Car} hint="Total (placeholder)" />
          <StatsCard title="Places offertes" value="—" icon={Users} hint="Cumuls (placeholder)" />
          <StatsCard title="Prochains trajets" value="—" icon={Calendar} hint="À venir" />
          <StatsCard title="Lieux populaires" value="—" icon={MapPin} hint="Top routes" />
        </div>

        {/* Liste des trajets du conducteur */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Mes trajets</h2>
            <p className="text-muted-foreground">
              Trajets publiés par le conducteur connecté.
            </p>
          </div>

          <TripsList conducteurId={conducteurId} filter="upcoming" emptyText="Aucun trajet à venir." />
        </section>
      </div>
    </Layout>
  );
}