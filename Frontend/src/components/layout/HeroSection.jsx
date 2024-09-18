import { useState } from "react";
import hero from "../../assets/images/hero.jpg";
import { useEffect } from "react";

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`font-bold text-5xl text-center text-custom-indigo uppercase transition-opacity duration-500  ${
          isVisible ? "animate-slide-up" : "opacity-0"
        }`}
      >
        Connecting Hearts
      </div>
      <img src={hero} className="w-[541px] aspect-3/2" />
      <div
        className={`py-2 font-bold text-5xl text-center text-pink-500 uppercase transition-opacity duration-500 ${
          isVisible ? "animate-slide-down" : "opacity-0"
        }`}
      >
        Building Love
      </div>
      <div className="font-bold text-base text-custom-indigo">
        "Find Your Perfect Match Today"
      </div>
    </div>
  );
}

export default HeroSection;
