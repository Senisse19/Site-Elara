import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PackagesSection from "@/components/packages/PackagesSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <PackagesSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
