import profileImage from "../../assets/images/profile.jpg";

function ProfileName({ color = "text-custom-indigo", name, image }) {
  const onClick = () => {
    console.log("Profile clicked");
  };
  return (
    <div
      className="flex items-center gap-2 pl-4 w-full cursor-pointer"
      onClick={onClick}
    >
      <img className="rounded-full w-[52px] h-[52px]" src={profileImage} />
      <div className={`font-bold text-center ${color} text-xl `}>
        Anush Dhungana
      </div>
    </div>
  );
}

export default ProfileName;
