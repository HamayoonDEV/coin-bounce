import * as yup from "yup";

const errorMessage = "use lower case,upper case and digits";
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;

const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("username is required!"),
  password: yup
    .string()
    .min(5)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("password is required!"),
});

export default loginSchema;
