import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
          <p className="text-muted-foreground">A página que você está procurando não existe.</p>
        </div>
        <Button 
          onClick={() => window.location.href = "/"}
          className="bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300"
        >
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
