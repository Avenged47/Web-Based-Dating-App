import Textfield from "../UI/Textfield";
import AuthForm from "./AuthForm";
import username from "../../assets/images/username.png";
import password from "../../assets/images/password.png";
import eye from "../../assets/images/eye.png";
import email from "../../assets/images/email.png";
import closeeye from "../../assets/images/closeeye.png";
import useShowPassword from "../../hooks/useShowPassword";

function Signup({ switchToLogin }) {
  const [showPassword, setShowPassword, togglePasswordVisibility] =
    useShowPassword();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Signup successful");
    switchToLogin();
  };

  return (
    <AuthForm
      title="Sign Up"
      subtitle="Please Register to login "
      buttonText="Sign  Up"
      // footerText="Already have account?"
      // footerButtoon="Login"
      onSubmit={onSubmit}
    >
      <Textfield
        leftIcon={<img src={username} />}
        name={"Username"}
        isRequired={"required"}
      />
      <Textfield
        leftIcon={<img src={email} />}
        name={"Email"}
        type={"email"}
        isRequired={"required"}
      />
      <Textfield
        leftIcon={<img src={password} />}
        name={"Password"}
        type={showPassword ? "text" : "password"}
        rightIcon={
          showPassword ? (
            <img src={closeeye} onClick={togglePasswordVisibility} />
          ) : (
            <img src={eye} onClick={togglePasswordVisibility} />
          )
        }
        isRequired={"required"}
      />
    </AuthForm>
  );
}

export default Signup;
