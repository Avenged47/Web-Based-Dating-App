import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("password is required"),
});

export default signupSchema;
