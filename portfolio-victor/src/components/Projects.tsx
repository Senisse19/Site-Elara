"use client";

import { motion } from "framer-motion";
import { Folder, ExternalLink, Github } from "lucide-react";

const projects = [1, 2, 3, 4]; // Placeholders

export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-24 bg-surface/30">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-3 py-1 bg-surface rounded-full text-blue-400 text-sm font-medium mb-4">
                        Portfólio
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white">Projetos em Destaque</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-background rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all shadow-xl"
                        >
                            {/* Project Image Placeholder */}
                            <div className="h-48 bg-surface/50 relative overflow-hidden group-hover:bg-surface/80 transition-colors flex items-center justify-center">
                                <Folder size={40} className="md:w-12 md:h-12 text-white/20 group-hover:text-primary/50 transition-colors" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                            </div>

                            <div className="p-5 md:p-6">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    Projeto Exemplo {index + 1}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    Descrição breve do projeto. Uma solução de arquitetura de IA utilizando LLMs e n8n.
                                </p>

                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 text-sm text-white bg-surface hover:bg-primary px-4 py-2 rounded-lg transition-colors">
                                        <ExternalLink size={16} /> Demo
                                    </button>
                                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                        <Github size={16} /> Código
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
