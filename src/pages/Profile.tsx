import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Edit, Shield, Star } from "lucide-react";
import { getUserById } from "@/services/conducteurService";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // récupère l'ID de l'utilisateur connecté
    const id = localStorage.getItem("userId");

    if (id) {
      getUserById(id)
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!user) {
    return (
      <Layout>
        <p>Chargement des informations...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Résumé utilisateur */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={user.avatarUrl || ""} />
                <AvatarFallback>
                  {user.prenom?.[0]}
                  {user.nom?.[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mt-2">
                {user.prenom} {user.nom}
              </h2>
              <div className="flex justify-center mt-2 space-x-2">
                <Badge variant="secondary">
                  <Shield className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
                <Badge variant="outline">
                  <Star className="mr-1 h-3 w-3" />
                  4.8
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Informations personnelles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Détails de votre profil</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="Prenom">Prénom</Label>
                    <Input id="Prenom" value={user.prenom} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Nom">Nom</Label>
                    <Input id="Nom" value={user.nom} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="Email" value={user.email} readOnly className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="PhoneNumber">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="PhoneNumber" value={user.phoneNumber || ""} readOnly className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Role">Rôle</Label>
                    <Input id="Role" value={user.role} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Numpermit">Numéro de permis</Label>
                    <Input id="Numpermit" value={user.numpermit || ""} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
