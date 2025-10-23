import Header from "@/components/Header";
import ElaraHero from "@/components/elara/ElaraHero";
import ElaraCapabilities from "@/components/elara/ElaraCapabilities";
import ElaraBenefitsMarquee from "@/components/elara/ElaraBenefitsMarquee";
import ElaraHowItWorks from "@/components/elara/ElaraHowItWorks";
import ElaraTestimonials from "@/components/elara/ElaraTestimonials";
import ElaraFAQ from "@/components/elara/ElaraFAQ";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <ElaraHero />
        <ElaraCapabilities />
        <ElaraBenefitsMarquee />
        <ElaraHowItWorks />
        <ElaraTestimonials />
        <About />
        <ElaraFAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
