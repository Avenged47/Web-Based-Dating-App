import ProfileImage from "../common/ProfileImage";
import girlfriend from "../../assets/images/girlfriend.jpg";
import ProfileName from "../common/ProfileName";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

function ProfileUi() {
  const buttonClicked = () => {
    console.log("Settings clicked");
  };
  return (
    <div>
      <div className="flex flex-row gap-20">
        <div className="flex items-center pt-12 pl-80 cursor-pointer">
          <ProfileImage size="200px" src={girlfriend} />
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
            <p className="font-bold text-custom-indigo text-lg">9 photos</p>
            <p className="flex flex-row gap-1 font-bold text-custom-indigo text-lg">
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
        <div className="bg-custom-grey mt-2 p-4 rounded-lg w-full max-w-md">
          <p className="text-base text-gray-700"></p>
        </div>
      </div>
    </div>
  );
}

export default ProfileUi;
