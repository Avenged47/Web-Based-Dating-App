import React from "react";

function Textfield({ leftIcon, rightIcon, name, type = "text", isRequired }) {
  return (
    <div className="relative py-3 w-full">
      {leftIcon && (
        <span className="top-1/2 left-4 absolute transform -translate-y-1/2">
          {leftIcon}
        </span>
      )}
      <input
        type={type}
        name={name}
        placeholder={name}
        className={`bg-white ${leftIcon ? "pl-12" : "pl-4"} ${rightIcon ? "pr-12" : "pr-4"} rounded-full w-full h-[41px]`}
        required={isRequired}
      />
      {rightIcon && (
        <span className="top-1/2 right-4 absolute transform -translate-y-1/2 cursor-pointer">
          {rightIcon}
        </span>
      )}
    </div>
  );
}

export default Textfield;
