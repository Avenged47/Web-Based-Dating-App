function ProfileImage({ image, alt = "Profile image", size = "52px" }) {
  return (
    <img
      className="rounded-full"
      src={image}
      alt={alt}
      style={{ width: size, height: size, objectFit: "cover" }}
    />
  );
}

export default ProfileImage;
