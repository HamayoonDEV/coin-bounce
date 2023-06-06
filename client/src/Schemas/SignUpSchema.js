import * as yup from "yup";

const errorMessage = "use lower case,upper case and digits";
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
const signUpSchema = yup.object().shape({
  name: yup.string().max(30).required("name is required!"),
  username: yup.string().min(5).max(30).required("username is required!"),
  email: yup
    .string()
    .email("enter a valid email!")
    .required("email is required!"),
  password: yup
    .string()
    .matches(passwordPattern, { message: errorMessage })
    .required("password is requied!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords must match")
    .required("confirm password is required!"),
});
export default signUpSchema;
