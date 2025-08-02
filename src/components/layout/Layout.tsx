import { Header } from "./Header";
import { Navigation, MobileNavigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 md:ml-64 pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}