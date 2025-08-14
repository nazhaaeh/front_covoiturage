import { useEffect, useMemo, useState } from "react";
import { getTrajetsByConducteur, Trajet } from "@/services/trajetService";
import { TripCard } from "./TripCard";
import { Card, CardContent } from "@/components/ui/card";
import { toTripCardModel } from "@/utils/tripMappers";

type FilterMode = "all" | "upcoming" | "past";

type TripsListProps = {
  conducteurId: string;
  filter?: FilterMode;
  emptyText?: string;
  onCountChange?: (count: number) => void; // <--  nouvelle prop
  onTotalChange?: (total: number) => void;
};

export default function TripsList({
  conducteurId,
  filter = "all",
  emptyText = "Aucun trajet à afficher.",
  onCountChange, // <-- 
  onTotalChange,   
}: TripsListProps) {
  const [trips, setTrips] = useState<Trajet[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTrajetsByConducteur(conducteurId);
        setTrips(data);
      } catch (e: any) {
        setErr(e.message || "Erreur lors du chargement des trajets");
      } finally {
        setLoading(false);
      }
    })();
  }, [conducteurId]);

  const tripsForView = useMemo(() => {
    let mapped = trips.map(toTripCardModel);

    if (filter === "upcoming") {
      mapped = mapped
        .filter((t) => t.status === "upcoming")
        .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
    } else if (filter === "past") {
      mapped = mapped
        .filter((t) => t.status === "completed")
        .sort((a, b) => b.datetime.getTime() - a.datetime.getTime());
    } else {
      mapped = mapped.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
    }

    return mapped;
  }, [trips, filter]);

  //  remonter le nombre au parent (MyTrips)
useEffect(() => {
    onCountChange?.(tripsForView.length);
    const total = tripsForView.reduce((sum, t) => sum + (t.price || 0), 0);
    onTotalChange?.(total);
  }, [tripsForView, onCountChange, onTotalChange]);

  if (loading) return <p>Chargement…</p>;
  if (err) return <p className="text-red-500">{err}</p>;

  if (tripsForView.length === 0) {
    return (
      <Card className="text-center py-10">
        <CardContent>
          <p className="text-muted-foreground">{emptyText}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {tripsForView.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}