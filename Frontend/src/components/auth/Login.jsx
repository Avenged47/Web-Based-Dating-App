import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Textfield from "../UI/Textfield";
import username from "../../assets/images/username.png";
import password from "../../assets/images/password.png";
import eye from "../../assets/images/eye.png";
import closeeye from "../../assets/images/closeeye.png";
import AuthForm from "./AuthForm";
import useShowPassword from "../../hooks/useShowPassword";

import useAuthForm from "../../hooks/useAuthForm";
import ErrorMessage from "../UI/ErrorMessage";
import { useState } from "react";

import { loginUser } from "../../services/authService";

function Login() {
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const { register, handleSubmit, errors } = useAuthForm({ type: "login" });

  const [showPassword, setShowPassword, togglePasswordVisibility] =
    useShowPassword();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { usernameOrEmail, password } = data;

    const isEmail = usernameOrEmail.includes("@");
    const payload = isEmail
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    console.log(payload);
    try {
      const response = await loginUser(payload);
      console.log(response);
      if (response.msg === "Login successful") {
        console.log("Login successful", response);
        navigate("/dashboard");
        setShowErrorMessage("");
      } else {
        setShowErrorMessage("Invalid username or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShowErrorMessage("Invalid username or password");
      } else {
        setShowErrorMessage("An error occured during login. Please try again");
      }
    }
  };

  return (
    //button color change baki xa
    <AuthForm
      title={"Login"}
      subtitle={"Please sign in to continue"}
      buttonText={"Login"}
      onSubmit={handleSubmit(onSubmit)}
      // footerText={"Don't Have Account?"}
      // footerButtoon={"Sign Up"}
    >
      <Textfield
        leftIcon={<img src={username} />}
        name="username"
        isRequired={"required"}
        placeholder={"Username or  Email"}
        {...register("usernameOrEmail")}
      />
      <ErrorMessage message={errors.username?.message} />
      <Textfield
        leftIcon={<img src={password} />}
        name="password"
        placeholder={"Password"}
        type={showPassword ? "text" : "password"}
        rightIcon={
          showPassword ? (
            <img src={eye} onClick={togglePasswordVisibility} />
          ) : (
            <img src={closeeye} onClick={togglePasswordVisibility} />
          )
        }
        isRequired={"required"}
        {...register("password")}
      />
      <ErrorMessage message={errors.password?.message} />
      <ErrorMessage message={showErrorMessage} />
    </AuthForm>
  );
}

export default Login;
