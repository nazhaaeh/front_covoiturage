import { Trajet } from "@/services/trajetService"; 

export const toTripCardModel = (t: Trajet) => {
  const now = new Date();
  const tripDate = new Date(t.dateDepart);

  const status: "upcoming" | "completed" =
    tripDate >= now ? "upcoming" : "completed";

  return {
    id: String(t.id),
    type: "offered" as const,
    driver: { name: "Conducteur", rating: 4.8, isVerified: true },
    origin: t.pointDepart,
    destination: t.pointArrivee,
    datetime: tripDate,
    availableSeats: t.placesDisponibles,
    totalSeats: t.placesDisponibles,
    price: t.prix,
    status,
  };
};