import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const ElaraTestimonials = () => {
  const testimonials = [
    { 
      img: "/lovable-uploads/client-1.png", 
      name: "Gabriel Branchi", 
      role: "Gestor de Tráfego",
      testimonial: "A automação de gestão de tráfego mudou completamente minha rotina! Antes eu passava horas ajustando campanhas manualmente. Agora, o sistema monitora performance em tempo real, otimiza lances automaticamente e me alerta apenas quando preciso tomar decisões estratégicas. Consegui escalar minhas operações sem precisar contratar mais pessoas, e o ROI dos meus clientes aumentou em média 35%."
    },
    { 
      img: "/lovable-uploads/client-2.png", 
      name: "Maurício Caetano", 
      role: "Editor de Vídeos",
      testimonial: "O agente de Social Media foi um divisor de águas! Como editor, eu sempre tive dificuldade com a parte estratégica e criação de legendas. Agora ele gera ideias criativas de conteúdo, cria variações de copy, sugere hashtags relevantes e até adapta o tom de voz para cada plataforma. Minha produtividade triplicou e consigo entregar conteúdo muito mais estratégico para meus clientes."
    },
    { 
      img: "/lovable-uploads/client-3.png", 
      name: "Ana Carolina Tavares", 
      role: "Estrategista Digital e Social Media",
      testimonial: "Trabalhar com os agentes de IA revolucionou minha agência! O agente de Social Media cria calendários de conteúdo completos alinhados com as estratégias dos clientes, enquanto o agente de prospecção ativa busca leads qualificados no Google Maps e agenda reuniões automaticamente. Consegui aumentar minha carteira em 60% no último trimestre sem aumentar minha equipe. É como ter dois colaboradores especialistas trabalhando 24/7!"
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-section-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Histórias reais de transformação digital com a Elara
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card key={index} className="p-6 flex flex-col h-full bg-card-gradient border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base text-muted-foreground mb-6 italic flex-grow leading-relaxed">
                "{item.testimonial}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img 
                  src={item.img} 
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
                />
                <div className="flex flex-col justify-center min-w-0">
                  <p className="font-semibold text-foreground leading-tight">{item.name}</p>
                  <p className="text-sm text-muted-foreground leading-tight truncate">{item.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElaraTestimonials;
