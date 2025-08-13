const API_URL = "https://localhost:7228/api";

export async function getDemandes() {
  const response = await fetch(`${API_URL}/auth/Getdemandeprofil`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Erreur lors de la récupération des demandes");
  }

  return response.json();
}
