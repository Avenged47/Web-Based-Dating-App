import logoimage from "../../assets/images/image.png";

function Logo({ color = "text-custom-indigo" }) {
  return (
    <div className="flex flex-row items-center">
      <img className="w-[52px] h-[52px]" src={logoimage} />
      <div className={`font-bold text-center ${color} text-xl uppercase`}>
        Match-Mate
      </div>
    </div>
  );
}

export default Logo;
