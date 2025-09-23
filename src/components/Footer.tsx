import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Victor Senisse</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Gestor de Automação & Engenheiro de Software especializado em 
              transformar processos complexos em soluções automatizadas eficientes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Navegação Rápida</h4>
            <div className="flex flex-col space-y-2">
              {[
                { label: "Início", id: "inicio" },
                { label: "Sobre Mim", id: "sobre" },
                { label: "Serviços", id: "servicos" },
                { label: "Contato", id: "contato" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const element = document.getElementById(link.id);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Conecte-se</h4>
            <div className="space-y-2">
              <p className="text-primary-foreground/80">senissevictor@gmail.com</p>
              <p className="text-primary-foreground/80">+55 (11) 99999-9999</p>
              <p className="text-primary-foreground/80">São Paulo, SP - Brasil</p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary-foreground/10 text-primary-foreground"
                onClick={() => window.open("https://www.linkedin.com/in/victorsenisse/", "_blank")}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary-foreground/10 text-primary-foreground"
                onClick={() => window.open("https://www.instagram.com/victor.senisse/", "_blank")}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary-foreground/10 text-primary-foreground"
                onClick={() => window.location.href = "mailto:senissevictor@gmail.com"}
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Victor de Almeida Senisse. Todos os direitos reservados.
          </p>
          
          <Button
            onClick={scrollToTop}
            size="sm"
            variant="ghost"
            className="hover:bg-primary-foreground/10 text-primary-foreground"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Voltar ao Topo
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;