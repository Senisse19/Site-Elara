"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">Victor Senisse</h3>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Desenvolvido por Victor Senisse.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                    <a href="mailto:senissevictor@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm">
                        <Mail size={16} /> senissevictor@gmail.com
                    </a>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin size={16} /> Porto Alegre, RS
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-surface rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/victorsenisse/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-surface rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
