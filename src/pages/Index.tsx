import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import "../components/AnimatedBackground.css";
import ElaraHero from "@/components/elara/ElaraHero";

// Lazy load components below the fold
const ElaraCapabilities = lazy(() => import("@/components/elara/ElaraCapabilities"));
const ElaraBenefits = lazy(() => import("@/components/elara/ElaraBenefits"));
const ElaraHowItWorks = lazy(() => import("@/components/elara/ElaraHowItWorks"));
const ElaraTestimonials = lazy(() => import("@/components/elara/ElaraTestimonials"));
const About = lazy(() => import("@/components/About"));
const ElaraFAQ = lazy(() => import("@/components/elara/ElaraFAQ"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="animated-bg" />
      <Header />
      <main>
        <ElaraHero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <ElaraCapabilities />
          <ElaraBenefits />
          <ElaraHowItWorks />
          <ElaraTestimonials />
          <About />
          <ElaraFAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
