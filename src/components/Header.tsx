import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import elaraLogo from "@/assets/elara-logo-white.png";
import DemoModal from "@/components/DemoModal";

const Header = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [showMobileButton, setShowMobileButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Show mobile button when reaching "capacidades" section
      const capacidadesSection = document.getElementById("capacidades");
      if (capacidadesSection) {
        const rect = capacidadesSection.getBoundingClientRect();
        setShowMobileButton(rect.top <= 100);
      }
      
      // Update active section based on scroll position
      const sections = ["inicio", "capacidades", "beneficios", "como-funciona", "depoimentos", "sobre", "faq", "contato"];
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
      const headerOffset = 100; // Offset to prevent header from covering title
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "inicio", label: "Início" },
    { id: "capacidades", label: "Como Funciona" },
    { id: "beneficios", label: "Benefícios" },
    { id: "sobre", label: "Sobre Mim" },
    { id: "faq", label: "FAQ" },
    { id: "contato", label: "Contato" },
  ];

  const handleDemoClick = () => {
    setIsDemoModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("inicio")}>
              <img src={elaraLogo} alt="Elara Logo" className="h-20 w-20 object-contain" />
            </div>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
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
            <Button 
              onClick={handleDemoClick}
              className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow transition-all text-white"
            >
              Agendar demonstração
            </Button>
          </div>

          {/* Mobile - Demo Button + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              onClick={handleDemoClick}
              size="sm"
              className={`bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow text-white text-xs px-3 transition-all duration-300 ${
                showMobileButton 
                  ? 'animate-[fadeIn_0.5s_ease-out] animate-in slide-in-from-right-4' 
                  : 'animate-[fadeOut_0.3s_ease-out] animate-out slide-out-to-right-4 opacity-0 pointer-events-none'
              }`}
            >
              Agendar
            </Button>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card/95 backdrop-blur-xl border-primary/20">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className={`justify-start text-base transition-colors hover:text-primary ${
                      activeSection === item.id ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button 
                  onClick={handleDemoClick}
                  className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow transition-all text-white mt-4"
                >
                  Agendar demonstração
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </nav>
    </header>
    <DemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </>
  );
};

export default Header;