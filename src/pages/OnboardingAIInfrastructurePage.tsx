import OnboardingAIInfrastructure from "@/components/OnboardingAIInfrastructure";
import Footer from "@/components/Footer";

const OnboardingAIInfrastructurePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <main className="pt-8 pb-16">
        <OnboardingAIInfrastructure />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingAIInfrastructurePage;