import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("your username or password is incorrect   ")
    .min(6, "Password must be at least 6 characters"),
});

export default signupSchema;
