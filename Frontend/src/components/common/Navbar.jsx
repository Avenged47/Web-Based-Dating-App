import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

function Navbar({ onJoinNowClick }) {
  const [showMenu, setShowmenu] = useState(false);

  const inactive =
    "text-center text-custom-indigo text-base  font-bold px-5 py-1";
  const activeClass =
    "lg:bg-custom-indigo lg:text-white rounded-full px-5 py-1 text-red-500 ";

  const links = [
    {
      path: "/home",
      label: "HOME",
    },
    {
      path: "/about",
      label: "ABOUT",
    },
    // {
    //   path: "#",
    //   label: "SERVICES",
    // },
    {
      path: "#",
      label: "JOIN NOW",
      onClick: () => onJoinNowClick(),
    },
  ];

  return (
    <div className="flex justify-between items-center px-2 lg:px-[149px] pt-8 pb-14 w-full">
      <Logo />
      <div className="flex">
        <button className="lg:hidden" onClick={() => setShowmenu(true)}>
          <GiHamburgerMenu className="w-6 h-6" />
        </button>
        <div
          className={`inset-0 lg:hidden fixed  justify-center items-center bg-fuchsia-500 z-10 ${showMenu ? "flex" : "hidden"}`}
        >
          <button
            className="top-11 right-2 absolute"
            onClick={() => setShowmenu(false)}
          >
            <IoMdClose className="w-6 h-6" />
          </button>
          <nav className="flex flex-col">
            {links.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${inactive} ${isActive ? activeClass : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="lg:flex items-center gap-6 hidden">
        {links.map(({ path, label, onClick }) => (
          <NavLink
            key={path}
            to={path}
            onClick={(e) => {
              if (onClick) {
                e.preventDefault();
                onClick();
              }
            }}
            className={({ isActive }) =>
              `${inactive} ${isActive ? activeClass : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
