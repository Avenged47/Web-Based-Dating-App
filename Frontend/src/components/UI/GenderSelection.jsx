import React from "react";

function GenderSelection({ selectedGender, onGenderChange }) {
  return (
    <div className="flex flex-row gap-4">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={selectedGender === "Male"}
          onChange={onGenderChange}
          className="hidden"
        />
        <div
          className={`w-8 h-8 flex items-center justify-center border-2 border-custom-indigo cursor-pointer ${
            selectedGender === "Male" ? "bg-custom-indigo text-white" : ""
          }`}
        >
          Male
        </div>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={selectedGender === "Female"}
          onChange={onGenderChange}
          className="hidden"
        />
        <div
          className={`w-8 h-8 flex items-center justify-center border-2 border-custom-indigo cursor-pointer ${
            selectedGender === "Female" ? "bg-custom-indigo text-white" : ""
          }`}
        >
          Female
        </div>
      </label>
    </div>
  );
}

export default GenderSelection;
