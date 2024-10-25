import { useState } from "react";

function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return [showPassword, setShowPassword, togglePasswordVisibility];
}

export default useShowPassword;
