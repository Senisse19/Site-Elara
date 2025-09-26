import OnboardingGeneral from "@/components/OnboardingGeneral";
import Footer from "@/components/Footer";

const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <main className="pt-8 pb-16">
        <OnboardingGeneral />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingPage;