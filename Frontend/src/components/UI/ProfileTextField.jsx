import { useState } from "react";
import Preferences from "./Preferences";

function ProfileTextField({
  name,
  type = "text",
  isRequired,
  options = [],
  onGenderSelect,
  selectedGender,
  choices = [],
  selectedChoices = [],
  onToggleChoice,
  value,
  onChange,
  placeholder,
}) {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div className="w-full">
      {type === "select" ? (
        <select
          name={name}
          required={isRequired}
          className="pl-4 rounded-md w-full h-[41px]"
          onChange={onChange}
          value={value}
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
                  ? "bg-custom-pink text-white"
                  : "bg-white"
              } `}
            >
              {gender}
            </div>
          ))}
        </div>
      ) : type === "choices" ? (
        <div>
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            required={isRequired}
            className="pl-4 rounded-md w-full h-[41px]"
            onClick={() => setShowPreferences(!showPreferences)}
            value={selectedChoices.join(", ")}
            readOnly
          />
          {showPreferences && (
            <Preferences
              choices={choices}
              selectedChoices={selectedChoices}
              onToggleChoice={onToggleChoice}
            />
          )}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={name}
          required={isRequired}
          className="pl-4 rounded-md w-full h-[41px]"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default ProfileTextField;
