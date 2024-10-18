import { useState } from "react";

function Preferences({ choices, selectedChoices, onToggleChoice }) {
  return (
    <div className="gap-4 grid grid-cols-3 p-4">
      {choices.map((choice) => (
        <div
          key={choice}
          onClick={() => onToggleChoice(choice)}
          className={`cursor-pointer rounded-full px-4 py-2 text-center border-2 transition-colors ${
            selectedChoices.includes(choice)
              ? "bg-custom-indigo text-white border-custom-indigo"
              : "bg-white text-custom-indigo border-custom-indigo"
          }`}
        >
          {choice}
        </div>
      ))}
    </div>
  );
}

export default Preferences;
