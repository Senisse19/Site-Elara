import Header from "@/components/Header";
import OnboardingWebsite from "@/components/OnboardingWebsite";
import Footer from "@/components/Footer";

const OnboardingWebsitePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <OnboardingWebsite />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingWebsitePage;