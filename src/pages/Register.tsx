import React, { useState,useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {registerUser,getRoles} from "@/services/authService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
    const [formData, setFormData] = useState({
     username: '',
        Nom: '',
        Prenom: '',
        email: '',
        password: '',
        contact: '',
        Numpermit: '',
        Role: '',

    });

        const [roles, setRoles] = useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   


async function register() {
  try {
    const responseMessage = await registerUser(formData);
    toast.success(responseMessage); // le texte "User registered successfully"
  } catch (error: any) {
    toast.error("Échec de l'inscription  "  + error.message);
  }
}
  useEffect(() => {
        getRoles()
            .then(data => setRoles(data))
            .catch(error => console.error(error.message));

    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <Card className="w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-semibold">Inscription</h2>

                <form className="space-y-4">
                    {/* <span className="text-red-500">*</span> */}
                 <Input type="username" name="username" placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange} required />

                    <Input name="Nom" placeholder="Nom" value={formData.Nom} onChange={handleChange} required />
                    <Input name="Prenom" placeholder="Prénom" value={formData.Prenom} onChange={handleChange} required />
                    <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <Input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
                    <Input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />

                    {formData.Role === 'Conducteur' && (
                        <>
                            <Input name="Numpermit" placeholder="Numéro de permit" value={formData.Numpermit} onChange={handleChange} required />
                        </>
                    )}
<div>
                        
<Label htmlFor="Role"> <span className="text-red-500">*</span> Rôle</Label>
                        
   <select id="role" value={formData.Role} onChange={(e) => setFormData({ ...formData, Role: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
 <option value="" disabled>
    Veuillez choisir un rôle
  </option>     {roles .filter((role) => role !== "Admin").map((role, index) => (
    <option key={index} value={role}> {role}
    </option>))} 
    </select>
</div>

                  

                    <Button className="w-full" type="button" onClick={register}>S'inscrire</Button>
                </form>
            </Card>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
  

        </div>
    );

}

export default Register;
