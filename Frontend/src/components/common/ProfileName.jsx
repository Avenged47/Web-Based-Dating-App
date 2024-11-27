function ProfileName({ color = "text-custom-indigo", name, username, image }) {
  const onClick = () => {
    console.log("Profile clicked");
  };
  return (
    <div className="flex items-center cursor-pointer" onClick={onClick}>
      <div className={`font-bold text-center ${color} text-xl`}>
        {username ? `@${username}` : name}
      </div>
    </div>
  );
}

export default ProfileName;
