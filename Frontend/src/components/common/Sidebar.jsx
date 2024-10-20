function Sidebar({ icon, text, onClick, isSelected, selectedSidebarIcon }) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer flex flex-row gap-3 pt-8 font-bold text-xl transition-colors ${
        isSelected ? "text-custom-pink" : "text-custom-indigo"
      }`}
    >
      <img
        src={isSelected ? selectedSidebarIcon : icon}
        alt={`${text} icon`}
        className="w-6 h-6 transition-all duration-300"
      />
      {text}
    </li>
  );
}

export default Sidebar;
