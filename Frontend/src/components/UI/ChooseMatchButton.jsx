function ChooseMatchButton({ type, children, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex justify-center items-center bg-custom-indigo w-[194px] sm:w-[180px] md:w-[194px] lg:w-[194px] h-[81px] sm:h-[70px] md:h-[81px] lg:h-[90px]"
    >
      {children}
    </button>
  );
}

export default ChooseMatchButton;
