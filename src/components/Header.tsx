import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetPortal, SheetOverlay } from "@/components/ui/sheet";
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
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        // Map section IDs to nav item IDs
        const sectionToNavMap: { [key: string]: string } = {
          "inicio": "inicio",
          "capacidades": "capacidades",
          "beneficios": "beneficios",
          "como-funciona": "como-funciona",
          "depoimentos": "depoimentos",
          "sobre": "sobre",
          "faq": "faq",
          "contato": "contato"
        };
        setActiveSection(sectionToNavMap[currentSection] || currentSection);
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
    { id: "depoimentos", label: "Depoimentos" },
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
          
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
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
              Agendar Demonstração
            </Button>
          </div>

          {/* Mobile - Demo Button + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            {showMobileButton && (
              <Button 
                onClick={handleDemoClick}
                size="sm"
                className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow text-white text-xs px-3 animate-in fade-in slide-in-from-right-2 duration-500"
              >
                Agendar
              </Button>
            )}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetPortal>
              <SheetOverlay className="bg-black/30" />
              <SheetContent 
                side="right" 
                className="w-72 sm:w-80 h-auto max-h-[70vh] rounded-2xl overflow-auto !top-20 !right-4 !bottom-auto !left-auto"
                style={{
                  background: 'rgba(11, 14, 24, 0.62)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(16.6px)',
                  WebkitBackdropFilter: 'blur(16.6px)'
                }}
              >
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
                    Agendar Demonstração
                  </Button>
                </nav>
              </SheetContent>
            </SheetPortal>
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
