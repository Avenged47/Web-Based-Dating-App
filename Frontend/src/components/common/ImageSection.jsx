import addPictureIcon from "../../assets/images/add picture.png";

function ImageSection() {
  return (
    <div className="relative outline-custom-dim-grey rounded-[7px] w-24 h-[130px] outline-[3px] outline-dashed">
      <img
        src={addPictureIcon}
        className="right-[-4px] bottom-[-3px] absolute w-6 h-6"
        alt="Add Pictures"
      />
    </div>
  );
}

export default ImageSection;
