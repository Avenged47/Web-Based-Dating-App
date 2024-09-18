import { useNavigate } from "react-router-dom";

import "tailwindcss/tailwind.css";
import Textfield from "../UI/Textfield";
import username from "../../assets/images/username.png";
import password from "../../assets/images/password.png";
import eye from "../../assets/images/eye.png";
import closeeye from "../../assets/images/closeeye.png";
import AuthForm from "./AuthForm";
import useShowPassword from "../../hooks/useShowPassword";

function Login() {
  const [showPassword, setShowPassword, togglePasswordVisibility] =
    useShowPassword();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login successful");
    navigate("/dashboard");
  };

  return (
    //button color change baki xa
    <AuthForm
      title={"login"}
      subtitle={"Please sign in to continue"}
      buttonText={"Login"}
      onSubmit={onSubmit}
      // footerText={"Don't Have Account?"}
      // footerButtoon={"Sign Up"}
    >
      <Textfield
        leftIcon={<img src={username} />}
        name={"Username"}
        isRequired={"required"}
      />
      <Textfield
        leftIcon={<img src={password} />}
        name={"Password"}
        type={showPassword ? "text" : "password"}
        rightIcon={
          showPassword ? (
            <img src={eye} onClick={togglePasswordVisibility} />
          ) : (
            <img src={closeeye} onClick={togglePasswordVisibility} />
          )
        }
        isRequired={"required"}
      />
    </AuthForm>
  );
}

export default Login;
