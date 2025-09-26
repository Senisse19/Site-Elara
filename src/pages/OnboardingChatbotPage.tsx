import Header from "@/components/Header";
import OnboardingChatbot from "@/components/OnboardingChatbot";
import Footer from "@/components/Footer";

const OnboardingChatbotPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <OnboardingChatbot />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingChatbotPage;