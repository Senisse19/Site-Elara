"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Analista de Inteligência Artificial (PJ)",
        company: "Grupo Studio",
        period: "Atual",
        description: "Desenvolvimento de modelos ML/NLP, criação de pipelines de dados e sistemas RAG. Integração de IA com sistemas corporativos, geração de dashboards preditivos e KPIs. Pesquisa e implementação de inovações em automação e ciência de dados.",
    },
    {
        role: "Especialista em IA e n8n (PJ)",
        company: "Brivia Group",
        period: "Projetos Recentes",
        description: "Criação de conteúdo sobre IA, desenvolvimento e integração de APIs, implementação de Multi-Agentes. Desenvolvimento de páginas estáticas e dinâmicas com ferramentas de IA.",
    },
    {
        role: "Desenvolvedor Back-End",
        company: "Zallpy Digital",
        period: "10/2023 - 04/2025",
        description: "Desenvolvimento e manutenção de sistemas backend para TK Elevator usando Progress 4GL. Liderança de projetos de automação e IA. Participação ativa em cerimônias Scrum e suporte a usuários nível 1.",
    },
    {
        role: "Assistente de Help Desk",
        company: "Tozzini Freire Advogados",
        period: "12/2021 - 10/2023",
        description: "Suporte técnico para 200+ usuários. Criação de VMs, clonagem de HDs, gestão de Active Directory e configuração de redes. Manutenção de infraestrutura e resolução de incidentes de TI.",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-16 md:py-24 bg-background relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
                        Trajetória
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white">Experiência Profissional</h2>
                </motion.div>

                <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 space-y-8 md:space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-0"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

                            <div className={`md:flex items-start justify-between group`}>
                                <div className="md:w-1/3 mb-2 md:mb-0 md:text-right md:pr-12">
                                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{exp.company}</h4>
                                    <span className="text-sm text-gray-400 font-mono">{exp.period}</span>
                                </div>

                                <div className="md:w-2/3 bg-surface/50 p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                                        {exp.role}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base">{exp.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
