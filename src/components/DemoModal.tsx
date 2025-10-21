import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    companyName: "",
    segment: "",
    monthlyRevenue: "",
    dailyLeads: "",
    challenge: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.whatsapp) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você pode integrar com sua API/backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Solicitação enviada!",
      description: "Entraremos em contato em breve para agendar sua demonstração.",
    });
    
    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      companyName: "",
      segment: "",
      monthlyRevenue: "",
      dailyLeads: "",
      challenge: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            Agendar Demonstração da Elara
          </DialogTitle>
          <p className="text-muted-foreground">
            Preencha os dados abaixo para qualificarmos sua demonstração
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Seu nome *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="João Silva"
              required
              className="bg-background border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Seu melhor e-mail *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="joao@empresa.com"
              required
              className="bg-background border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-foreground">
              WhatsApp *
            </Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="(11) 99999-9999"
              required
              className="bg-background border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-foreground">
              Qual é o nome da sua empresa?
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Minha Empresa Ltda"
              className="bg-background border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="segment" className="text-foreground">
              Qual o segmento da sua empresa?
            </Label>
            <Input
              id="segment"
              value={formData.segment}
              onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
              placeholder="Ex: E-commerce, Saúde, Educação"
              className="bg-background border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue" className="text-foreground">
              Qual é o seu faturamento mensal atual?
            </Label>
            <Select
              value={formData.monthlyRevenue}
              onValueChange={(value) => setFormData({ ...formData, monthlyRevenue: value })}
            >
              <SelectTrigger className="bg-background border-primary/20">
                <SelectValue placeholder="Selecione uma faixa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50k">Até R$ 50.000</SelectItem>
                <SelectItem value="50k-200k">R$ 50.001 a R$ 200.000</SelectItem>
                <SelectItem value="200k-500k">R$ 200.001 a R$ 500.000</SelectItem>
                <SelectItem value="500k+">Acima de R$ 500.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyLeads" className="text-foreground">
              Quantos leads (contatos) sua empresa recebe por dia?
            </Label>
            <Select
              value={formData.dailyLeads}
              onValueChange={(value) => setFormData({ ...formData, dailyLeads: value })}
            >
              <SelectTrigger className="bg-background border-primary/20">
                <SelectValue placeholder="Selecione uma faixa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 leads</SelectItem>
                <SelectItem value="11-50">11-50 leads</SelectItem>
                <SelectItem value="51-100">51-100 leads</SelectItem>
                <SelectItem value="100+">Mais de 100 leads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge" className="text-foreground">
              Qual seu maior desafio no atendimento hoje?
            </Label>
            <Textarea
              id="challenge"
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              placeholder="Ex: Não consigo atender todos os leads rapidamente, perco vendas fora do horário comercial..."
              rows={4}
              className="bg-background border-primary/20"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-blue-500 hover:shadow-glow transition-all text-white"
            size="lg"
          >
            Agendar Demonstração
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
