function Button({ onClick, children, type = "button", formType, ...props }) {
  let className;
  if (formType === "loginSignup") {
    className =
      "bg-custom-indigo py-[11px] rounded-[100px] font-medium text-base text-center text-custom-white";
  } else {
    className =
      "text-white text-2xl font-extrabold text-center bg-custom-indigo rounded-[7px] ";
  }
  return (
    <div className={className} {...props}>
      <button type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
