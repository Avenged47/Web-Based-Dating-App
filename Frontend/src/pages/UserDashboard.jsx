import { useState } from "react";

import cross from "../assets/images/cross.png";
import home from "../assets/images/home.png";
import add from "../assets/images/add.png";
import messagess from "../assets/images/messagess.png";
import notifications from "../assets/images/notifications.png";
import profile from "../assets/images/profile.png";
import search from "../assets/images/search.png";
import settings from "../assets/images/settings.png";

import Logo from "../components/common/Logo";
import Sidebar from "../components/common/Sidebar";
import VerticalLine from "../components/common/VerticalLine";
import CardLayout from "../components/layout/CardLayout";
import ChooseMatchButton from "../components/UI/ChooseMatchButton";
import ProfileName from "../components/common/ProfileName";
import pinkHome from "../assets/images/pinkhome.png";
import pinkProfile from "../assets/images/pinkprofile.png";
import pinkMessages from "../assets/images/pinkmessages.png";
import pinkSearch from "../assets/images/pinksearch.png";
import pinkNotifications from "../assets/images/pinknotifications.png";
import pinkSettings from "../assets/images/pinksettings.png";

import CompleteProfile from "../components/auth/CompleteProfile";
import ChatUi from "../components/UI/ChatUi";

function UserDashboard() {
  const [selectedOption, setSelectedOption] = useState("");
  // const [selectedSidebarIcon, setSelectedSidebarIcon] = useState("Home");

  const handleSidebarClick = (option) => {
    setSelectedOption(option);
    console.log("Option selected:", option);
  };

  return (
    <>
      <div className="flex flex-row h-screen">
        <div className="flex flex-col pt-14 pl-[79px]">
          <Logo />
          <div className="pt-14 pl-[25px]">
            <ul>
              <Sidebar
                icon={home}
                text="Home"
                isSelected={selectedOption === "Home"}
                selectedSidebarIcon={pinkHome}
                onClick={() => handleSidebarClick("Home")}
              />
              <Sidebar
                icon={search}
                text="Search"
                isSelected={selectedOption === "Search"}
                selectedSidebarIcon={pinkSearch}
                onClick={() => handleSidebarClick("Search")}
              />
              <Sidebar
                icon={messagess}
                text="Messages"
                isSelected={selectedOption === "Messages"}
                selectedSidebarIcon={pinkMessages}
                onClick={() => handleSidebarClick("Messages")}
              />
              <Sidebar
                icon={notifications}
                text="Notification"
                isSelected={selectedOption === "Notification"}
                selectedSidebarIcon={pinkNotifications}
                onClick={() => handleSidebarClick("Notification")}
              />
              <Sidebar
                icon={settings}
                text="Settings"
                isSelected={selectedOption === "Settings"}
                selectedSidebarIcon={pinkSettings}
                onClick={() => handleSidebarClick("Settings")}
              />
              <Sidebar
                icon={profile}
                text="Profile"
                isSelected={selectedOption === "Profile"}
                selectedSidebarIcon={pinkProfile}
                onClick={() => handleSidebarClick("Profile")}
              />
            </ul>
          </div>
        </div>

        <VerticalLine height="100%" />
        <ChatUi />
        {/* <div className="flex flex-col justify-center items-center px-[50px] md:px-[150px] lg:px-[300px]">
          <CardLayout />
          <div className="flex flex-row gap-3 pt-3">
            <ChooseMatchButton type="button">
              <img src={cross} alt="cross icon" />
            </ChooseMatchButton>
            <ChooseMatchButton type="button">
              <img src={add} alt="add icon" />
            </ChooseMatchButton>
          </div>
        </div> */}

        <div className="flex md:flex-row flex-col items-center md:items-start">
          <VerticalLine height="100%" />
          <div className="pt-14">
            <ProfileName />
          </div>
        </div>
        {/* <div className="flex-grow px-[30px] py-14 overflow-y-auto">
          <CompleteProfile />
        </div> */}
      </div>
    </>
  );
}

export default UserDashboard;
