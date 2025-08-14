// src/services/trajetService.ts
import axios from "axios";

const API_URL = "https://localhost:7228/api/trajet";

export const creerTrajet = async (trajetData: any) => {
  return await axios.post(API_URL, trajetData);
};

export interface Trajet {
  id: number;
  pointDepart: string;
  pointArrivee: string;
  dateDepart: string;     // ISO
  isRecurring: boolean;
  placesDisponibles: number;
  prix: number;
  matriculeCar: string;
  conducteurId: string;
}

export async function getTrajetsByConducteur(conducteurId: string): Promise<Trajet[]> {
const res = await fetch(`${API_URL}/gettrajet?conducteurId=${encodeURIComponent(conducteurId)}`);
   if (!res.ok) throw new Error("Erreur lors du chargement des trajets");
   return res.json();
 }
// export async function getTrajetsByConducteur(conducteurId: string): Promise<Trajet[]> {
//   const res = await fetch(
//     ${API_URL}/gettrajet?conducteurId=${encodeURIComponent(conducteurId)},
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!res.ok) throw new Error("Erreur lors du chargement des trajets");
//   return res.json();
// }