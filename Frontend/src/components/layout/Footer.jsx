import Logo from "../common/Logo";
import phone from "../../assets/images/phone.png";
import email from "../../assets/images/email.png";
import location from "../../assets/images/location.png";

function Footer() {
  //hover ko kura mileko xaina
  const ullist =
    " hover:text-red-700   font-normal text-base py-[4px] transition-all ";

  const headingText = "mt-[67px] font-bold text-custom-pink text-xl";
  return (
    <>
      <hr className="mx-20 mt-[74px]" />
      <div className="flex flex-row flex-wrap justify-between px-4 lg:px-[149px]">
        {/* footer logo */}
        <div className="mt-[67px] w-auto md:w-1/3">
          <Logo color="text-custom-pink" />
          <p className="pt-5 font-normal text-base text-white capitalize">
            "MatchMate connects singles by making meaningful matches easy and
            fun. Our platform combines advanced matchmaking with an engaging
            user experience to help you find your perfect partner."
          </p>
        </div>

        {/* quick links */}
        <div>
          <p className={headingText}>Quick Links</p>
          <ul className="pt-4 font-normal text-base text-white">
            <li className={ullist}>About</li>
            <li className={ullist}>Contact</li>
            <li className={ullist}>Terms & Conditions</li>
            <li className={ullist}> Privacy policy</li>
          </ul>
        </div>

        {/* contact us */}
        <div>
          <p className={headingText}>Contact Us</p>
          <ul>
            <li
              className={`flex flex-row gap-4 text-white font-normal pt-4 ${ullist}`}
            >
              <img src={phone} /> 01-5910781
            </li>
            <li
              className={`flex flex-row gap-4 text-white font-normal pt-4 ${ullist}`}
            >
              <img src={email} /> matchmate@gmail.com
            </li>
            <li
              className={`flex flex-row gap-4 text-white font-normal pt-4 ${ullist}`}
            >
              <img src={location} /> ShivaChowk, Ktm
            </li>
          </ul>
        </div>
      </div>

      <div className="py-10 text-base text-center text-white">
        Copyright © Match-Mate. All Rights Reserved.
      </div>
    </>
  );
}

export default Footer;
