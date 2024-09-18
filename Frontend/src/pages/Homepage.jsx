import Navbar from "../components/common/Navbar";
import FeaturesSection from "../components/layout/FeaturesSection";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/layout/HeroSection";
import SlidingForm from "../components/auth/animation/SlidingForm";
import useSlidingForm from "../hooks/useSlidingForm";

function Homepage() {
  const [showSlidingForm, setShowSlidingForm] = useSlidingForm();
  return (
    <div className="min-h-dvh">
      <Navbar onJoinNowClick={() => setShowSlidingForm(true)} />
      {showSlidingForm ? (
        <SlidingForm setShowSlidingForm={setShowSlidingForm} />
      ) : (
        <HeroSection />
      )}
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default Homepage;
