import Header from "@/components/Header";
import OnboardingGeneral from "@/components/OnboardingGeneral";
import Footer from "@/components/Footer";

const OnboardingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <OnboardingGeneral />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingPage;