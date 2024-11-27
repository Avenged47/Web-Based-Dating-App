import { useState } from "react";
import addPictureIcon from "../../assets/images/add picture.png";

function ImageSection({ onImageUpload, imageSrc }) {
  const [selectedImage, setSelectedImage] = useState(imageSrc || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative outline-custom-dim-grey rounded-[7px] w-32 h-[160px] outline-[3px] outline-dashed">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected"
          className="rounded-[7px] w-full h-full object-cover"
        />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt="User Image"
          className="rounded-[7px] w-full h-full object-cover"
        />
      ) : (
        <img
          src={addPictureIcon}
          className="right-[-4px] bottom-[-3px] absolute w-6 h-6"
          alt="Add Pictures"
        />
      )}
    </div>
  );
}

export default ImageSection;
