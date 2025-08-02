import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {registerUser} from "@/services/authService"

function Register() {
    const [formData, setFormData] = useState({
     username: 'test',
        Nom: '',
        Prenom: '',
        email: '',
        password: '',
        contact: '',
        matricule: '',
        role: '',
        
        //   confirmPassword: "StrongPassword123"


    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 👉 On affiche les données dans la console au lieu d’un service API
        console.log("Données soumises :", formData);
        alert("Inscription testée localement !");
    };
//     function register(){
//         registerUser(formData);
//         console.log("data envoyé par la fonction ",formData)


// // return 
//      }
async function register() {
  try {
    const response = await registerUser(formData);
    console.log("Données envoyées :", formData);
    alert("Inscription réussie !");
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    alert("Erreur lors de l'inscription : " + error.message);
  }
}

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <Card className="w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-semibold">Inscription</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="Nom" placeholder="Nom" value={formData.Nom} onChange={handleChange} required />
                    <Input name="Prenom" placeholder="Prénom" value={formData.Prenom} onChange={handleChange} required />
                    <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <Input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />

                    <div>
                        <Label htmlFor="role">Rôle</Label>
                        <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            
                            <option value="passenger">Passager</option>
                            <option value="driver">Conducteur</option>
                        </select>
                    </div>

                    {formData.role === 'driver' && (
                        <>
                            <Input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
                            <Input name="matricule" placeholder="Numéro de matricule" value={formData.matricule} onChange={handleChange} required />
                        </>
                    )}

                    <Button className="w-full" onClick={register}>S'inscrire</Button>
                </form>
            </Card>
        </div>
    );
}

export default Register;
