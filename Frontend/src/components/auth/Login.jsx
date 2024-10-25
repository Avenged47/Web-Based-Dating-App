import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";

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

function Login() {
  const validCredentials = [
    { username: "user1", password: "password123" },
    { username: "user2", password: "mypassword" },
    { username: "user3", password: "12345678" },
  ];
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const { register, handleSubmit, errors } = useAuthForm({ type: "login" });

  const [showPassword, setShowPassword, togglePasswordVisibility] =
    useShowPassword();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { username, password } = data;

    const isValidUser = validCredentials.some(
      (user) => user.username === username && user.password === password
    );
    if (isValidUser) {
      console.log("Login successful");
      navigate("/dashboard");
      setShowErrorMessage("");
    } else {
      setShowErrorMessage("Invalid username or password");
    }
  };

  return (
    //button color change baki xa
    <AuthForm
      title={"login"}
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
        {...register("username")}
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
