import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

const Resume = () => {
  const experiences = [
    {
      title: "Gestor de Automação Senior",
      company: "Tech Solutions Corp",
      period: "2022 - Presente",
      location: "São Paulo, SP",
      description: "Liderança de equipe de automação, desenvolvimento de soluções RPA e gestão de projetos de transformação digital.",
      achievements: [
        "Implementação de 50+ processos automatizados",
        "Redução de 70% no tempo de execução de tarefas",
        "Economia anual de R$ 2M para a empresa"
      ]
    },
    {
      title: "Engenheiro de Software",
      company: "Innovation Labs",
      period: "2020 - 2022",
      location: "São Paulo, SP",
      description: "Desenvolvimento de aplicações web e mobile, integração de APIs e arquitetura de sistemas escaláveis.",
      achievements: [
        "Desenvolvimento de 15+ aplicações web",
        "Melhoria de 40% na performance dos sistemas",
        "Implementação de CI/CD para toda a equipe"
      ]
    },
    {
      title: "Desenvolvedor Full Stack",
      company: "StartupTech",
      period: "2019 - 2020",
      location: "São Paulo, SP",
      description: "Criação de MVPs, prototipagem rápida e desenvolvimento de funcionalidades para produtos digitais.",
      achievements: [
        "Lançamento de 3 produtos digitais",
        "Crescimento de 200% na base de usuários",
        "Otimização da experiência do usuário"
      ]
    }
  ];

  const education = [
    {
      degree: "Especialização em Automação Industrial",
      institution: "FIAP",
      period: "2021 - 2022",
      description: "Foco em IoT, Machine Learning e sistemas automatizados"
    },
    {
      degree: "Bacharelado em Engenharia de Software",
      institution: "Universidade de São Paulo",
      period: "2016 - 2020",
      description: "Base sólida em desenvolvimento, algoritmos e arquitetura de software"
    }
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "UiPath RPA Developer Advanced",
    "Google Cloud Professional",
    "Scrum Master Certified",
    "Python Institute PCAP",
    "Microsoft Azure Fundamentals"
  ];

  return (
    <section id="resumo" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Resumo Profissional
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma trajetória construída com foco em inovação, automação e resultados excepcionais.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience Section */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Experiência Profissional</h3>
            
            {experiences.map((exp, index) => (
              <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground">{exp.title}</h4>
                    <div className="flex items-center gap-2 text-primary mt-1">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-foreground">Principais conquistas:</h5>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, achieveIndex) => (
                      <li key={achieveIndex} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Formação</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <Card key={index} className="p-4 hover:shadow-card transition-all duration-300">
                    <h4 className="font-semibold text-foreground mb-1">{edu.degree}</h4>
                    <p className="text-primary font-medium mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs">{edu.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Certificações</h3>
              <Card className="p-4">
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="w-full justify-start bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;