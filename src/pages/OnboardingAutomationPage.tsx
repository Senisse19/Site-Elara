import Header from "@/components/Header";
import OnboardingAutomation from "@/components/OnboardingAutomation";
import Footer from "@/components/Footer";

const OnboardingAutomationPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <OnboardingAutomation />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingAutomationPage;