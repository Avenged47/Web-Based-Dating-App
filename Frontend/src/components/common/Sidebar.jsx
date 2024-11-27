import { useEffect, useState } from "react";

function Sidebar({
  icon,
  text,
  onClick,
  isSelected,
  selectedSidebarIcon,
  notificationsCount,
}) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer flex flex-row gap-3 pt-8 font-bold text-xl transition-colors ${
        isSelected ? "text-custom-pink" : "text-custom-indigo"
      }`}
    >
      <div className="relative flex flex-row gap-0">
        <img
          src={isSelected ? selectedSidebarIcon : icon}
          alt={`${text} icon`}
          className="w-6 h-6 transition-all duration-300"
        />
        {notificationsCount > 0 && (
          <span className="top-[-9px] right-[-3px] z-20 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
            {1}
          </span>
        )}
      </div>
      {text}
    </li>
  );
}

export default Sidebar;
