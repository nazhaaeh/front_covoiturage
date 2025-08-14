import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Filter } from "lucide-react";
import TripsList from "@/components/dashboard/TripList";
import { useState } from "react";

export default function MyTrips() {
  // TODO: remplacer par l’ID réel du conducteur connecté
  const conducteurId = "12";

  // Ces états vont permettre à MyTrips de savoir si TripsList est vide
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mes trajets</h1>
            <p className="text-muted-foreground">
              Gérez vos trajets et suivez votre historique de voyages
            </p>
          </div>
          <Button variant="gradient">
            <Plus className="mr-2 h-4 w-4" />
            Proposer un nouveau trajet
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Nombre total de trajets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingCount + pastCount}</div>
              <p className="text-xs text-muted-foreground">Ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">À venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingCount}</div>
              <p className="text-xs text-muted-foreground">7 prochains jours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Gains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$186</div>
              <p className="text-xs text-muted-foreground">Ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Note</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Basé sur 127 avis</p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="past">Trajets passés</TabsTrigger>
              <TabsTrigger value="requests" disabled>Demandes</TabsTrigger>
            </TabsList>

            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
          </div>

          {/* À venir */}
          <TabsContent value="upcoming" className="space-y-4">
            <TripsList
              conducteurId={conducteurId}
              filter="upcoming"
              onCountChange={(count) => setUpcomingCount(count)}
            />
            {upcomingCount === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-1">Aucun trajet à venir</h3>
                  <p className="text-muted-foreground mb-4">
                    Vous n’avez pas encore de trajets planifiés.
                  </p>
                  <Button variant="gradient">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer mon premier trajet
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Passés */}
          <TabsContent value="past" className="space-y-4">
            <TripsList
              conducteurId={conducteurId}
              filter="past"
              onCountChange={(count) => setPastCount(count)}
            />
            {pastCount === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-1">Aucun trajet passé</h3>
                  <p className="text-muted-foreground">
                    Les trajets effectués apparaîtront ici.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}