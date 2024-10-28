import Textfield from "../UI/Textfield";
import AuthForm from "./AuthForm";
import username from "../../assets/images/username.png";
import password from "../../assets/images/password.png";
import eye from "../../assets/images/eye.png";
import email from "../../assets/images/email.png";
import closeeye from "../../assets/images/closeeye.png";
import useShowPassword from "../../hooks/useShowPassword";
import useAuthForm from "../../hooks/useAuthForm";
import ErrorMessage from "../UI/ErrorMessage";
import { signupUser } from "../../services/authService";

import { useState } from "react";

function Signup({ switchToLogin }) {
  const [showPassword, setShowPassword, togglePasswordVisibility] =
    useShowPassword();
  const [passwordmatch, setPasswordmatch] = useState(false);

  const { register, handleSubmit, errors } = useAuthForm({ type: "signup" });
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    const { email, username, password, confirmPassword } = data;
    console.log(data);

    if (password !== confirmPassword) {
      setPasswordmatch("Password doesnot match");
      return;
    }
    setPasswordmatch(false);

    try {
      const result = await signupUser({ email, username, password });
      console.log("successful", result);
      switchToLogin();
    } catch (error) {
      setApiError(error.message);
      console.log("signup error", error);
    }
  };

  return (
    <AuthForm
      title="Sign Up"
      subtitle="Please Register to login "
      buttonText="Sign  Up"
      // footerText="Already have account?"
      // footerButtoon="Login"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textfield
        leftIcon={<img src={email} />}
        name={"email"}
        placeholder={"Email"}
        type={"email"}
        isRequired={"required"}
        {...register("email")}
      />
      <ErrorMessage message={errors.email?.message} />
      <Textfield
        leftIcon={<img src={username} />}
        name={"username"}
        placeholder={"Username"}
        isRequired={"required"}
        {...register("username")}
      />

      <ErrorMessage message={errors.username?.message} />
      <Textfield
        leftIcon={<img src={password} />}
        name={"password"}
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

      <Textfield
        leftIcon={<img src={password} />}
        name={"password"}
        placeholder={"Confirm Password"}
        type={showPassword ? "text" : "password"}
        rightIcon={
          showPassword ? (
            <img src={eye} onClick={togglePasswordVisibility} />
          ) : (
            <img src={closeeye} onClick={togglePasswordVisibility} />
          )
        }
        isRequired={"required"}
        {...register("confirmPassword")}
      />

      <ErrorMessage message={errors.confirmPassword?.message} />
      <ErrorMessage message={passwordmatch} />

      {apiError && <ErrorMessage message={apiError} />}
    </AuthForm>
  );
}

export default Signup;
