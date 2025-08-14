import { Header } from "./Header";
import { Navigation ,MobNavigation } from "./adminNavigation";


interface LayoutProps {
  children: React.ReactNode;
  navigationComponent?: React.ReactNode; // Optional prop for custom navigation
}

export function Layout({ children, navigationComponent }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {navigationComponent || <Navigation />} {/* Use custom nav or default */}
        <main className="flex-1 md:ml-64 pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      <MobNavigation />
    </div>
  );
}
