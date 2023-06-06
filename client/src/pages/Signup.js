import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useFormik, validateYupSchema } from "formik";

import Textfile from "../compnents/Textfile";
import signUpSchema from "../Schemas/SignUpSchema";
import "./Signup.css";
import { signUp } from "../api/internal";
import { setUser } from "../store/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const handleSignUp = async () => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const response = await signUp(data);
    if (response.status === 201) {
      //setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      dispatch(setUser(user));
      //Redirct -> to Home page
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      //display errormessage
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
  });

  return (
    <div className="signUpWrapper">
      <div className="signUpHeader">Create an account</div>
      <Textfile
        value={values.name}
        type="text"
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <Textfile
        value={values.username}
        type="text"
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />

      <Textfile
        value={values.email}
        type="email"
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="email"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.email}
      />

      <Textfile
        value={values.password}
        type="password"
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <Textfile
        value={values.confirmPassword}
        type="password"
        name="confirmPassword"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="confirmPassword"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />

      <button
        className="signupbutton"
        onClick={handleSignUp}
        disabled={
          !values.username ||
          !values.password ||
          errors.username ||
          errors.password ||
          !values.name ||
          errors.name ||
          !values.confirmPassword ||
          errors.confirmPassword ||
          !values.email ||
          errors.email
        }
      >
        signUp
      </button>
      <span>
        Already have an account?
        <button className="loginAccount" onClick={() => navigate("/login")}>
          login
        </button>
      </span>
      {error != "" ? <p className="errorMessage">{error}</p> : ""}
    </div>
  );
};

export default Signup;
