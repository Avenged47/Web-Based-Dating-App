import * as yup from "yup";

const loginSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("Username/email is required"),
  password: yup.string().required("password is required"),
});

export default loginSchema;
