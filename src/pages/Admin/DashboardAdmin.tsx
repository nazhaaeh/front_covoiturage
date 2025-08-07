import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-carpooling.jpg";
import { Layout } from "@/components/layout/LayoutAdmin";
import { useNavigate } from "react-router-dom";

const adminStats = [
  {
    title: "Nombre des utilisateurs",
    value: 150,
    description: "ensembles des utilisateurs",
    icon: Users,
    trend: { value: 10, label: "from last week" }
  },
  {
    title: "Approbations en attente",
    value: 5,
    description: "Inscriptions en attendant de confirmations",
    icon: Clock,
  },
];

const adminQuickActions = [
  {
    title: "Manage Users",
    description: "View and edit users",
    icon: Users,
    action: "/Utilisateur",
    variant: "gradient" as const,
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleActionClick = (actionPath) => {
    navigate(actionPath);
  };

  return (
    <Layout>
      <div className="space-y-8 p-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="h-64 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h1 className="text-4xl font-bold">Bienvenu dans la page admin</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Bienvenu dans votre espace admin - Gérez facilement vos utilisateurs 
              </p>
            </div>
          </div>
        </div>

        {/* Combined Statistics and Quick Actions */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Tableau de Bord Admin</CardTitle>
            <CardDescription>Vue d'ensemble et actions rapides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Statistics Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {adminStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="p-6 hover:shadow-lg transition-shadow w-full">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <p className="text-sm text-muted-foreground">
                              {stat.description}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        {stat.trend && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            <span className={stat.trend.value > 0 ? "text-green-500" : "text-red-500"}>
                              {stat.trend.value > 0 ? "+" : ""}{stat.trend.value}%
                            </span>{" "}
                            {stat.trend.label}
                          </p>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
                <div className="grid grid-cols-1 gap-4">
                  {adminQuickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Card key={index} className="p-6 text-center hover:shadow-lg cursor-pointer">
                        <div className="space-y-4">
                          <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                          <Button 
                            variant={action.variant} 
                            className="w-full"
                            onClick={() => handleActionClick(action.action)}
                          >
                            Go
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>  
  );
}