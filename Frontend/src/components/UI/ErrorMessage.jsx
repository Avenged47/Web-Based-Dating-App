import React from "react";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      className="flex items-center bg-red-50 my-1 p-3 border border-red-400 rounded-full text-red-700"
      role="alert"
    >
      <svg
        className="mr-2 w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M12 4h.01M3 12a9 9 0 1018 0 9 9 0 00-18 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
