import HeroSection from "./HeroSection";
import Features from "./Features"; 
import Gallery from "./Gallery";
import News from "./News";
import AppDownload from "./AppDownload";
import Footer from "./Footer";
import FeedbackSection from "./FeedbackSection";

function Home() {
  return (
    <div>
      <HeroSection/>
      <Features/>
      <Gallery/>
      <News/>
      <AppDownload/>
      <FeedbackSection/>
      <Footer/>
    </div>
  );
}

export default Home;