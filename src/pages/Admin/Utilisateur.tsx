import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/LayoutAdmin";

// Fonction pour récupérer les données depuis une API
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users");
    if (!response.ok) {
      throw new Error(`Erreur réseau ou serveur : ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Échec de la récupération des utilisateurs :", err.message);
    return [];
  }
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleAccept = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/accept`, { method: "PATCH" });
      if (!response.ok) throw new Error("Échec de l'acceptation");
      setUsers(users.map(user =>
        user.id === userId ? { ...user, Status: { ...user.Status, StatusId: 1 } } : user
      ));
      alert(`Utilisateur ${userId} accepté`);
    } catch (err) {
      alert(`Erreur lors de l'acceptation : ${err.message}`);
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/reject`, { method: "PATCH" });
      if (!response.ok) throw new Error("Échec du refus");
      setUsers(users.map(user =>
        user.id === userId ? { ...user, Status: { ...user.Status, StatusId: 2 } } : user
      ));
      alert(`Utilisateur ${userId} refusé`);
    } catch (err) {
      alert(`Erreur lors du refus : ${err.message}`);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <Card className="w-full bg-gradient-to-br from-gray-100 to-white shadow-2xl rounded-xl transform hover:scale-101 transition-all duration-300">
          <CardHeader className="p-6">
            <CardTitle className="text-3xl font-bold text-gray-800 tracking-wide">Gestion des Utilisateurs</CardTitle>
            <CardDescription className="text-gray-600">Gérez efficacement les inscriptions et les informations des utilisateurs</CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full bg-white shadow-2xl rounded-xl transform hover:scale-101 transition-all duration-300">
          <CardHeader className="p-6">
            <CardTitle className="text-2xl font-semibold text-gray-700">Liste des Utilisateurs</CardTitle>
            <CardDescription className="text-gray-500">Vue d'ensemble des utilisateurs en attente d'approbation</CardDescription>
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
                    <tr className="transform perspective-500 hover:perspective-1000 transition-all duration-300">
                      <th className="px-6 py-4 rounded-tl-lg">ID</th>
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Prénom</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Nom d'utilisateur</th>
                      <th className="px-6 py-4">Rôle</th>
                      <th className="px-6 py-4">Statut</th>
                      {users.some(user => user.Role === "Conducteur") && (
                        <>
                          <th className="px-6 py-4">Numéro de permis</th>
                          <th className="px-6 py-4">Contact</th>
                        </>
                      )}
                      <th className="px-6 py-4 rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={users.some(user => user.Role === "Conducteur") ? "11" : "9"} className="px-6 py-4 text-center text-gray-500 bg-white rounded-b-lg">
                          Aucun utilisateur pour l'instant.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr
                          key={user.id}
                          className="bg-white hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl rounded-lg"
                        >
                          <td className="px-6 py-4 border-b border-gray-200">{user.id || "N/A"}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{user.Nom || "N/A"}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{user.Prenom || "N/A"}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{user.Email || "N/A"}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{user.username || "N/A"}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{user.Role || "N/A"}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{user.Status?.Nom || "En attente"}</td>
                          {user.Role === "Conducteur" && (
                            <>
                              <td className="px-6 py-4 border-b border-gray-200">{user.Numdepermit || "N/A"}</td>
                              <td className="px-6 py-4 border-b border-gray-200">{user.contact || "N/A"}</td>
                            </>
                          )}
                          <td className="px-6 py-4 border-b border-gray-200">
                            {(!user.Status || user.Status.StatusId === 0) && (
                              <div className="flex space-x-2">
                                <Button
                                  variant="gradient"
                                  className="bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600 transform hover:-translate-y-1 transition-all duration-200 shadow-md"
                                  onClick={() => handleAccept(user.id)}
                                >
                                  Accepter
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transform hover:-translate-y-1 transition-all duration-200 shadow-md"
                                  onClick={() => handleReject(user.id)}
                                >
                                  Refuser
                                </Button>
                              </div>
                            )}
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