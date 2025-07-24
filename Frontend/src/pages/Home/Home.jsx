import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import News from "./components/News";
import AppDownload from "./components/AppDownload";
import Footer from "./components/Footer";
import FeedbackSection from "./components/FeedbackSection";
import EventPopupModal from "./components/EventPopupModal"; // ✅

function Home() {
  return (
    <div>
      <EventPopupModal/>
      <HeroSection />
      <Features />
      <Gallery />
      <News />
      <AppDownload />
      <FeedbackSection />
      <Footer />
    </div>
  );
}

export default Home;
