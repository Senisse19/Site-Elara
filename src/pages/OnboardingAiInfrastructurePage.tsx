import OnboardingAiInfrastructure from "@/components/OnboardingAiInfrastructure";
import Footer from "@/components/Footer";

const OnboardingAiInfrastructurePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <main className="pt-8 pb-16">
        <OnboardingAiInfrastructure />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingAiInfrastructurePage;