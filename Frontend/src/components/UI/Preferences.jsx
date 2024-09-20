import { useState } from "react";

function Preferences({ choices }) {
  const [selectChoices, setSelectChoices] = useState([]);

  const handleToggleChoice = (choice) => {
    setSelectChoices((prev) =>
      prev.includes(choice)
        ? prev.filter((i) => i !== choice)
        : [...prev, choice]
    );
  };

  return (
    <div className="gap-4 grid grid-cols-3 p-4">
      {choices.map((choice) => (
        <div
          key={choice}
          onClick={() => handleToggleChoice(choice)}
          className={`cursor-pointer rounded-full px-4 py-2 text-center border-2 transition-colors ${
            selectChoices.includes(choice)
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
