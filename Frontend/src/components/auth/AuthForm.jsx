import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "tailwindcss/tailwind.css";

import Button from "../UI/Button";

const customIndigo = "#6C51A2";

const CustomSwitch = styled(Switch)({
  "& .MuiSwitch-switchBase": {
    color: customIndigo,
    "&.Mui-checked": {
      color: customIndigo,
      "& + .MuiSwitch-track": {
        backgroundColor: customIndigo,
      },
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: customIndigo,
  },
});

const label = { inputProps: { "aria-label": "Color switch demo" } };

function AuthForm({
  title,
  subtitle,
  children,
  buttonText,
  footerText,
  footerButtoon,
  footerButtonAction,
  onSubmit,
}) {
  return (
    <div className="flex justify-center items-center w-full">
      <form
        className="relative bg-custom-grey px-12 py-[100px] rounded-[10px] w-full max-w-[509px]"
        onSubmit={onSubmit}
      >
        <h1 className="font-bold text-[32px] text-custom-indigo">{title}</h1>
        <p className="font-normal text-base text-custom-dim-indigo">
          {subtitle}
        </p>
        {children}
        <div className="flex flex-row justify-between pb-[19px]">
          <p className="font-normal text-base text-custom-dim-indigo">
            Remember me next time
          </p>
          <div>
            <CustomSwitch {...label} defaultChecked size="small" />
          </div>
        </div>
        {/* <div className="bg-custom-indigo py-[11px] rounded-[100px] font-medium text-base text-center text-custom-white">
          <button type="submit">{buttonText}</button>
        </div> */}
        <Button type="submit" formType={"loginSignup"}>
          {buttonText}
        </Button>
        <div className="pt-[19px] text-center text-custom-dim-indigo">
          {footerText}
          <button
            className="font-medium text-base text-custom-indigo"
            onClick={footerButtonAction}
          >
            {footerButtoon}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
