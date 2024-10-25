import { useState } from "react";
import Login from "../Login";
import Signup from "../Signup";
import onlineDating from "../../../assets/images/dada.jpeg";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../UI/ButtonUi";

function SlidingForm({ setShowSlidingForm }) {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[1018px] h-[513px] overflow-hidden">
        <div className="top-4 right-4 z-10 absolute">
          <button
            className="text-custom-indigo"
            onClick={() => setShowSlidingForm(false)}
          >
            <AiOutlineClose size={36} />
          </button>
        </div>
        <div
          className={`absolute w-full h-full transition-transform duration-500 ${isAnimated ? "translate-x-full" : "translate-x-0"}`}
        >
          <div className="flex w-full h-full">
            <div className="flex flex-shrink-0 justify-center items-center bg-white w-1/2 h-full">
              <Login />
            </div>
            <div className="relative flex-shrink-0 bg-gray-100 w-1/2 h-full">
              <img
                src={onlineDating}
                alt="Signup"
                className="w-full h-full object-cover"
              />
              <div className="bottom-4 left-1/2 absolute transform -translate-x-1/2">
                <button
                  onClick={() => setIsAnimated(true)}
                  className="bg-custom-indigo px-4 py-2 rounded text-white"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute w-full h-full transition-transform duration-500 ${isAnimated ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex w-full h-full">
            <div className="relative flex-shrink-0 bg-gray-100 w-1/2 h-full">
              <img
                src={onlineDating}
                alt="Login"
                className="w-full h-full object-cover"
              />
              <div className="bottom-4 left-1/2 absolute transform -translate-x-1/2">
                <button
                  onClick={() => setIsAnimated(false)}
                  className="bg-custom-indigo px-4 py-2 rounded text-white"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="flex flex-shrink-0 justify-center items-center bg-white w-1/2 h-full">
              <Signup switchToLogin={() => setIsAnimated(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlidingForm;
