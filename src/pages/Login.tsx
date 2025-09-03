import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const result = await loginUser(formData);

      toast.success("Connexion réussie !");
      console.log("Données reçues :", result);

      // Stocker en localStorage si tu veux garder la session
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("role", result.role);
      localStorage.setItem("nom", result.nom);
      localStorage.setItem("prenom", result.prenom);



      // Redirection selon le rôle
        if (result.role === "Conducteur") {
      navigate("/home");   // page du conducteur
    } else if (result.role === "Passager") {
      navigate("/createTrip");   // page pour créer un trajet
    } 
    } catch (error: any) {
      toast.error("Échec de connexion : " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Connexion</h2>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button className="w-full" type="button" onClick={handleLogin}>
          Se connecter
        </Button>
      </Card>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
