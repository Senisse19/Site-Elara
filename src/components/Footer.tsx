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
                { label: "Resumo", id: "resumo" },
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
              <p className="text-primary-foreground/80">victor.senisse@email.com</p>
              <p className="text-primary-foreground/80">+55 (11) 99999-9999</p>
              <p className="text-primary-foreground/80">São Paulo, SP - Brasil</p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary-foreground/10 text-primary-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary-foreground/10 text-primary-foreground"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary-foreground/10 text-primary-foreground"
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