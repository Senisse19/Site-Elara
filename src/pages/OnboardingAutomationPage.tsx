import OnboardingAutomation from "@/components/OnboardingAutomation";
import Footer from "@/components/Footer";

const OnboardingAutomationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <main className="pt-8 pb-16">
        <OnboardingAutomation />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingAutomationPage;