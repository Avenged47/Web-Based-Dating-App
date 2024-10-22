function ProfileImage({ src, alt = "Profile image", size = "52px" }) {
  return (
    <img
      className="rounded-full"
      src={src}
      alt={alt}
      style={{ width: size, height: size, objectFit: "cover" }}
    />
  );
}

export default ProfileImage;
