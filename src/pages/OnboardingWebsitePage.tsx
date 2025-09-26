import OnboardingWebsite from "@/components/OnboardingWebsite";
import Footer from "@/components/Footer";

const OnboardingWebsitePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <main className="pt-8 pb-16">
        <OnboardingWebsite />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingWebsitePage;