# Site Elara - Landing Page

![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)

Landing page moderna e interativa para o projeto Elara, com animações sofisticadas, efeitos 3D e integração com backend.

## 🚀 Sobre o Projeto

O **Site Elara** é uma landing page de alto impacto visual desenvolvida com React e Vite, apresentando uma experiência de usuário premium com animações fluidas, efeitos de partículas, chatbot simulado e design responsivo de última geração.

### ✨ Funcionalidades Principais

- **🎨 Design Premium**: Interface moderna com glassmorphism e gradientes dinâmicos
- **✨ Animações Sofisticadas**: Efeitos com Framer Motion e Lottie
- **🌊 Background Interativo**: Partículas animadas e elementos flutuantes
- **💬 Chatbot Simulado**: Interface de chat interativa com respostas automáticas
- **🎬 Vídeo Background**: Background em vídeo otimizado para hero section
- **📱 Totalmente Responsivo**: Otimizado para mobile-first
- **🌙 Tema Dark/Light**: Suporte a múltiplos temas
- **⚡ Performance Otimizada**: Lazy loading, code splitting e otimizações avançadas
- **📊 Integração Backend**: Conectado com Supabase para dados dinâmicos

## 🛠️ Tecnologias Utilizadas

### Core
- **[Vite](https://vitejs.dev/)** - Build tool de próxima geração
- **[React 18](https://react.dev/)** - Biblioteca de interface de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[React Router DOM](https://reactrouter.com/)** - Roteamento

### Animações & UI
- **[Framer Motion](https://www.framer.com/motion/)** - Animações declarativas
- **[Lottie React](https://github.com/LottieFiles/lottie-react)** - Animações JSON
- **[Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/)** - Efeitos 3D de inclinação

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos acessíveis
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Recharts](https://recharts.org/)** - Gráficos e visualizações

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animações Tailwind

### Backend & Data
- **[Supabase](https://supabase.com/)** - Backend as a Service
- **[TanStack Query](https://tanstack.com/query)** - Data fetching e cache
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de esquemas

### Carousel & Media
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrossel performático

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou bun

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Senisse19/Site-Elara.git
cd Site-Elara
```

2. **Instale as dependências**
```bash
npm install
# ou
bun install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_URL=seu_supabase_url
VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key
```

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
bun dev
```

5. **Acesse a aplicação**

Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📁 Estrutura do Projeto

```
Site-Elara/
├── src/
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes de UI base (shadcn)
│   │   ├── Hero.tsx      # Seção hero com vídeo
│   │   ├── ParticleBackground.tsx  # Background de partículas
│   │   └── ...
│   ├── pages/            # Páginas da aplicação
│   ├── hooks/            # Custom hooks
│   ├── contexts/         # Contextos React
│   ├── integrations/     # Integrações (Supabase, etc)
│   ├── lib/              # Utilitários
│   ├── utils/            # Funções auxiliares
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Entry point
├── public/               # Arquivos estáticos
├── server/              # Backend Express (opcional)
└── supabase/            # Configurações e migrations do Supabase
```

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run build:dev` - Build de desenvolvimento
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter
- `npm run dev:server` - Inicia servidor Express (se usado)

## 🎨 Componentes Principais

### Hero Section
- Vídeo background em loop
- Animações de texto letter-by-letter
- Efeitos de gradiente dinâmico
- CTA buttons animados

### Particle Background
- Sistema de partículas interativo
- Otimizado para performance
- Responsivo e adaptável

### Chatbot Simulado
- Interface de chat realista
- Respostas automáticas contextuais
- Animações de digitação
- Auto-scroll inteligente

### Floating Elements
- Elementos flutuantes animados
- Efeitos de parallax
- Glassmorphism

## 🚀 Deploy

### Netlify / Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto na plataforma
3. Configure as variáveis de ambiente
4. Build command: `npm run build`
5. Output directory: `dist`

### Build Manual

```bash
# Criar build de produção
npm run build

# O conteúdo estará em ./dist
# Faça upload para seu servidor web
```

## ⚡ Otimizações de Performance

- **Code Splitting**: Carregamento lazy de componentes
- **Image Optimization**: Imagens otimizadas e lazy loading
- **Video Optimization**: Vídeo comprimido e fallback para mobile
- **Performance Detection**: Ajuste automático de features baseado no dispositivo
- **CSS Animations**: Uso de CSS puro para animações simples
- **Minification**: Bundle otimizado e minificado

## 🎨 Customização

### Cores e Temas

Edite `tailwind.config.ts` para personalizar o tema:
```typescript
theme: {
  extend: {
    colors: {
      // Suas cores personalizadas
    }
  }
}
```

### Animações

Configure animações em `src/index.css` e componentes individuais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto é privado e proprietário.

## 👨‍💻 Autor

**Victor Senisse**
- GitHub: [@Senisse19](https://github.com/Senisse19)

## 📞 Suporte

Para suporte, entre em contato através das issues do GitHub.

---

Desenvolvido com ❤️ por Victor Senisse
