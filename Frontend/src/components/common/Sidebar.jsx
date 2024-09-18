function Sidebar({ icon, text }) {
  return (
    <li className="flex flex-row gap-3 pt-8 font-bold text-custom-indigo text-xl">
      <img src={icon} alt={`${text} icon`} /> {text}
    </li>
  );
}

export default Sidebar;
