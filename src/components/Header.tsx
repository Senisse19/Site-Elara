import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["inicio", "sobre", "servicos", "resumo", "contato"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "inicio", label: "Início" },
    { id: "sobre", label: "Sobre Mim" },
    { id: "servicos", label: "O que Eu Faço" },
    { id: "resumo", label: "Resumo" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-card/95 backdrop-blur-md shadow-card" : "bg-transparent"
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            Victor Senisse
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={() => window.open("http://wa.me/5551981221324", "_blank")}
            className="bg-hero-gradient text-primary-foreground hover:shadow-glow transition-all duration-300"
          >
            Solicitar Orçamento
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;