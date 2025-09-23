import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Users, Trophy } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Code,
      value: "5+",
      label: "Anos de Experiência",
      description: "Desenvolvendo soluções"
    },
    {
      icon: Zap,
      value: "100+",
      label: "Processos Automatizados",
      description: "Eficiência comprovada"
    },
    {
      icon: Users,
      value: "50+",
      label: "Clientes Atendidos",
      description: "Projetos entregues"
    },
    {
      icon: Trophy,
      value: "98%",
      label: "Taxa de Sucesso",
      description: "Satisfação garantida"
    }
  ];

  const skills = [
    "Python", "JavaScript", "TypeScript", "React", "Node.js",
    "Automação RPA", "APIs REST", "Integração de Sistemas",
    "Análise de Dados", "Machine Learning", "DevOps", "Scrum"
  ];

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Sobre Mim
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sou apaixonado por tecnologia e automação, com foco em criar soluções 
            que transformam a maneira como as empresas operam.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="relative">
              <img
                src="/lovable-uploads/profile-photo-2.png"
                alt="Victor Senisse - Perfil Profissional"
                className="w-full max-w-md mx-auto rounded-2xl shadow-card"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Transformando Ideias em Soluções
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Com mais de 5 anos de experiência em desenvolvimento de software e gestão de automação, 
                especializo-me em criar sistemas que otimizam processos empresariais e aumentam a 
                produtividade das equipes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Minha abordagem combina conhecimento técnico sólido com uma visão estratégica de negócios, 
                garantindo que cada solução desenvolvida gere valor real para os clientes.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Principais Tecnologias:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-glow transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;