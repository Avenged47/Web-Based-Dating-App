import ProfileImage from "../common/ProfileImage";
import girlfriend from "../../assets/images/girlfriend.jpg";
import ProfileName from "../common/ProfileName";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useState } from "react";
import girlfriend1 from "../../assets/images/girlfriend.jpg";

function ProfileUi() {
  const likes = [
    "Traveling",
    "Photography",
    "Music",
    "Cooking",
    "Reading",
    "Hiking",
    "Gaming",
    "Dancing",
    "Art",
    "Movies",
    "Fitness",
    "Yoga",
    "Writing",
    "Cycling",
    "Gardening",
    "Running",
    "Fashion",
    "Foodie",
    "Tech Gadgets",
    "Volunteering",
  ];

  const [bio, setBio] = useState("");
  const [showLikes, setShowLikes] = useState(false);
  const [showDislikes, setShowDislikes] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);

  const toggleSection = (section) => {
    if (section === "likes") {
      setShowLikes(!showLikes);
    } else if (section === "dislikes") {
      setShowDislikes(!showDislikes);
    } else if (section === "images") {
      setShowImages(!showImages);
    } else if (section === "personalDetails") {
      setShowPersonalDetails(!showPersonalDetails);
    }
  };

  const handleBioChange = (e) => {
    const maxWords = 50;
    const words = e.target.value.split(" ").slice(0, maxWords).join(" ");
    setBio(words);
  };

  const buttonClicked = () => {
    console.log("Settings clicked");
  };

  return (
    <div>
      <div className="flex flex-row gap-20">
        <div className="flex items-center pt-12 pl-80 cursor-pointer">
          <ProfileImage size="200px" image={girlfriend} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center gap-8">
            <ProfileName username="John_Doe" />
            <button
              className="bg-custom-indigo hover:bg-opacity-80 hover:font-bold hover:bg px-4 py-2 rounded-lg text-base text-white whitespace-nowrap"
              onClick={buttonClicked}
            >
              Edit profile
            </button>
            <IoSettingsOutline
              className="text-3xl text-custom-indigo cursor-pointer"
              onClick={buttonClicked}
            />
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <p className="font-bold text-custom-indigo text-lg">9 Photos</p>
            <p className="flex flex-row items-center gap-1 font-bold text-custom-indigo text-lg">
              9 Matches <FaHeart className="text-red-500" />
            </p>
          </div>
          <div className="flex flex-row mt-4">
            <ProfileName name={"John Doe"} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start pt-8 pl-80">
        <h2 className="font-bold text-custom-indigo text-xl">Bio</h2>
        <textarea
          className="border-gray-300 bg-white mt-2 p-4 border rounded-lg w-full max-w-lg h-24 text-base text-custom-indigo"
          placeholder="Write a short bio about yourself (max 50 words)..."
          value={bio}
          onChange={handleBioChange}
        />
        <p className="mt-1 text-custom-indigo text-sm">
          {bio.split(" ").length}/50 words
        </p>
      </div>

      <div className="flex flex-col items-start pt-8 pl-80">
        <h2 className="flex flex-row items-center gap-3 font-bold text-custom-indigo text-xl">
          Personal Details
          <IoMdArrowDropdownCircle
            onClick={() => toggleSection("personalDetails")}
            className={`cursor-pointer transition-colors ${
              showLikes ? "text-custom-pink" : "text-custom-indigo"
            }`}
          />
        </h2>
        {showPersonalDetails && (
          <div className="gap-8 mt-4">
            <div className="flex flex-row gap-4">
              <span className="font-bold text-custom-indigo">Email:</span>
              <span className="text-custom-indigo">
                boylatest7@gmail.com
              </span>{" "}
            </div>
            <div className="flex flex-row gap-4">
              <span className="font-bold text-custom-indigo">Gender:</span>
              <span className="text-custom-indigo">Male</span>{" "}
            </div>

            <div className="flex flex-row gap-4">
              <span className="font-bold text-custom-indigo">
                Date of Birth:
              </span>
              <span className="text-custom-indigo">2001/03/26</span>{" "}
            </div>

            <div className="flex flex-row gap-4">
              <span className="font-bold text-custom-indigo">
                Sexual Orientation:
              </span>
              <span className="text-custom-indigo">Straight</span>{" "}
            </div>

            <div className="flex flex-row gap-4">
              <span className="font-bold text-custom-indigo">
                Relationship Status:
              </span>
              <span className="text-custom-indigo">Single</span>{" "}
            </div>

            <div className="flex flex-row gap-4">
              <span className="font-bold text-custom-indigo">
                Interested In:
              </span>
              <span className="text-custom-indigo">Female</span>{" "}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start pt-8 pl-80">
        <h2 className="flex flex-row items-center gap-3 font-bold text-custom-indigo text-xl">
          Images
          <IoMdArrowDropdownCircle
            onClick={() => toggleSection("images")}
            className={`cursor-pointer transition-colors ${
              showImages ? "text-custom-pink" : "text-custom-indigo"
            }`}
          />
        </h2>
        {showImages && (
          <div className="gap-4 grid grid-cols-3 mt-4">
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
            <img
              src={girlfriend1}
              alt="Sample 1"
              className="rounded-lg w-40 h-40 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-start pt-8 pl-80">
        <h2 className="flex flex-row items-center gap-3 font-bold text-custom-indigo text-xl">
          Interests
          <IoMdArrowDropdownCircle
            onClick={() => toggleSection("likes")}
            className={`cursor-pointer transition-colors ${
              showLikes ? "text-custom-pink" : "text-custom-indigo"
            }`}
          />
        </h2>
        {showLikes && (
          <div className="gap-4 grid grid-cols-4 mt-4">
            {likes.map((like, index) => (
              <div
                key={index}
                className="bg-gray-200 px-4 py-2 rounded-lg font-bold text-center text-custom-indigo"
              >
                {like}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start pt-8 pl-80">
        <h2 className="flex flex-row items-center gap-3 font-bold text-custom-indigo text-xl">
          Dislikes
          <IoMdArrowDropdownCircle
            onClick={() => toggleSection("dislikes")}
            className={`cursor-pointer transition-colors ${
              showDislikes ? "text-custom-pink" : "text-custom-indigo"
            }`}
          />
        </h2>
        {showDislikes && (
          <div className="gap-4 grid grid-cols-4 mt-4">
            {likes.map((like, index) => (
              <div
                key={index}
                className="bg-gray-200 px-4 py-2 rounded-lg font-bold text-center text-custom-indigo"
              >
                {like}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUi;
