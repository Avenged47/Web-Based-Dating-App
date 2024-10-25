import loginSchema from "../validation/loginSchema";
import signupSchema from "../validation/signupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function useAuthForm({ type = "login" }) {
  const schema = type === "login" ? loginSchema : signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
}

export default useAuthForm;
