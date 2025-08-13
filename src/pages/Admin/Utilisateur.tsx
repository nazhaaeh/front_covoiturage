import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/LayoutAdmin";
import {getDemandes} from "@/services/DemandeProfilsService";
import {updateDemandeStatus} from "@/services/authService"


export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des données depuis l'API .NET Core
  useEffect(() => {
    
      const fetchUsers = async () => {
      try {
        const data = await getDemandes();
        console.log("Données reçues :", data); 
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  
  }, []);

  const handleUpdateStatus = async (userId: string, statusId: number) => {
  try {
    await updateDemandeStatus(userId, statusId);
    // Mise à jour locale de l'état
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, statusId } : u
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <Card className="w-full bg-gradient-to-br from-gray-100 to-white shadow-2xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 tracking-wide">
              Gestion des Utilisateurs
            </CardTitle>
            <CardDescription className="text-gray-600">
              Liste des demandes de profils
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full bg-white shadow-2xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700">Liste des Utilisateurs</CardTitle>
            <CardDescription className="text-gray-500">
              Vue d'ensemble des utilisateurs enregistrés
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="h-12 w-12 animate-spin text-blue-300" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 bg-gradient-to-b from-white to-gray-50 border-separate border-spacing-0 rounded-lg shadow-lg">
                  <thead className="bg-gradient-to-r from-blue-300 to-gray-200 text-gray-800">
                    <tr>
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Prénom</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Nom d'utilisateur</th>
                      <th className="px-6 py-4">Rôle</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Numéro de permis</th>
                      <th className="px-6 py-4">Actions</th>

                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-6 py-4 text-center text-gray-500 bg-white rounded-b-lg">
                          Aucun utilisateur pour l'instant.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr
                          key={user.id}
                          className="bg-white hover:bg-gray-50 transition-all duration-200"
                        >
                          <td className="px-6 py-4 border-b">{user.nom || "N/A"}</td>
                          <td className="px-6 py-4 border-b">{user.prenom || "N/A"}</td>
                          <td className="px-6 py-4 border-b">{user.email || "N/A"}</td>
                          <td className="px-6 py-4 border-b">{user.userName || "N/A"}</td>
                          <td className="px-6 py-4 border-b">{user.role || "N/A"}</td>
                          <td className="px-6 py-4 border-b">{user.phoneNumber || "N/A"}</td>
                          <td className="px-6 py-4 border-b">{user.numpermit || "N/A"}</td>
                          
                          <td className="px-6 py-4 border-b">
                            <div className="flex space-x-2 items-center">
                                <button
      className="bg-gradient-to-r from-blue-300 to-white text-blue-800 font-semibold px-3 py-1 rounded shadow hover:from-white hover:to-blue-300 transition-colors"
      type="button"
      onClick={async () => {
        try {
          await updateDemandeStatus(user.id, 2);
          setUsers(users.filter(u => u.id !== user.id)); // retire la ligne du tableau
        } catch (error) {
          console.error(error);
        }
      }}
    >
      Accepter
    </button>

    <button
      className="bg-gradient-to-r from-red-900 to-red-600 text-white font-semibold px-4 py-2 rounded shadow hover:from-red-600 hover:to-red-900 transition-colors"
      type="button"
      onClick={async () => {
        try {
          await updateDemandeStatus(user.id, 3);
          setUsers(users.filter(u => u.id !== user.id));
        } catch (error) {
          console.error(error);
        }
      }}
    >
      Refuser
    </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
