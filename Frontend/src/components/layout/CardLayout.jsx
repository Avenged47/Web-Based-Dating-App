import { useState } from "react";

// import hero from "../../assets/images/girlfriend.jpg";
// import profile from "../../assets/images/profile.jpg";
// import features from "../../assets/images/features.png";
import leftside from "../../assets/images/leftside.png";
import rightside from "../../assets/images/rightside.png";

function CardLayout({ name, images }) {
  // const images = [hero, features, profile];
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
      <div className="relative w-full">
        <img
          src={`http://localhost:5000/${images && images[currentIndex]}`}
          alt={name}
          className="top-0 left-0 rounded-lg w-full h-full aspect-[3/4] object-cover"
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
        <div className="bottom-0 absolute bg-white bg-opacity-75 rounded-b-lg w-full text-center">
          <p className="pt-1 font-bold text-custom-indigo text-lg md:text-xl">
            {name}
          </p>

          <p className="px-2 py-2 font-normal text-center text-custom-indigo text-xs md:text-sm break-words">
            "❤️We are matched❤️"
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardLayout;
