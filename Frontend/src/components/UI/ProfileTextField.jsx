function ProfileTextField({
  name,
  type = "text",
  isRequired,
  options = [],
  onGenderSelect,
  selectedGender,
}) {
  return (
    <div className="w-full">
      {type === "select" ? (
        <select
          name={name}
          required={isRequired}
          className="pl-4 rounded-md w-full h-[41px]"
        >
          <option value="" disabled>
            Select {name}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "gender" ? (
        <div className="gap-4 grid grid-cols-3 w-full">
          {["Male", "Female", "Other"].map((gender) => (
            <div
              key={gender}
              onClick={() => onGenderSelect(gender)}
              className={`cursor-pointer rounded-md h-[41px] flex items-center justify-center  w-full ${
                selectedGender === gender
                  ? "bg-custom-indigo text-white"
                  : "bg-white"
              } `}
            >
              {gender}
            </div>
          ))}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={name}
          required={isRequired}
          className="pl-4 rounded-md w-full h-[41px]"
        />
      )}
    </div>
  );
}

export default ProfileTextField;
