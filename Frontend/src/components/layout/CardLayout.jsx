import { useState } from "react";

import hero from "../../assets/images/girlfriend.jpg";
import profile from "../../assets/images/profile.jpg";
import features from "../../assets/images/features.png";
import leftside from "../../assets/images/leftside.png";
import rightside from "../../assets/images/rightside.png";

function CardLayout() {
  const images = [hero, features, profile];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div className="relative aspect-square">
        <img
          src={images[currentIndex]}
          className="rounded-lg w-full h-full object-cover"
          alt="Hero"
        />
        <button
          onClick={handlePrev}
          className="top-1/2 left-2 absolute p-2 rounded-full transform -translate-y-1/2"
        >
          <img src={leftside} />
        </button>
        <button
          onClick={handleNext}
          className="top-1/2 right-2 absolute p-2 rounded-full transform -translate-y-1/2"
        >
          <img src={rightside} />
        </button>
        <div className="bottom-0 absolute bg-white bg-opacity-75 p-4 rounded-b-lg w-full text-center">
          <p className="font-bold text-custom-indigo text-lg md:text-xl">
            Anush Dhungana
          </p>
          <p className="font-medium text-custom-indigo text-xs md:text-sm">
            12Km away
          </p>
          <p className="font-normal text-custom-indigo text-xs md:text-sm break-words">
            blah blah blah blah.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardLayout;
