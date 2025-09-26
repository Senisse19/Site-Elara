import OnboardingChatbot from "@/components/OnboardingChatbot";
import Footer from "@/components/Footer";

const OnboardingChatbotPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <main className="pt-8 pb-16">
        <OnboardingChatbot />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingChatbotPage;