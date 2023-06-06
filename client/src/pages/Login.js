import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/userSlice";
import { login } from "../api/internal";
import loginSchema from "../Schemas/LoginSchema";
import Textfile from "../compnents/Textfile";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password,
    };
    const response = await login(data);

    if (response.status === 200) {
      //1.setuser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      dispatch(setUser(user));
      //2 Redirect -> Home page
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      //display errormessage
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="loginWrapper">
      <div className="loginHeader">LogIn to your account</div>
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
        type="password"
        name="password"
        placeholder="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <button
        className="loginbutton"
        onClick={handleLogin}
        disabled={
          !values.username ||
          !values.password ||
          errors.username ||
          errors.password
        }
      >
        LogIn
      </button>
      <span>
        Don't have an account?
        <button className="createAccount" onClick={() => navigate("/signup")}>
          Register
        </button>
      </span>
      {error != "" ? <p className="errorMessage">{error}</p> : ""}
    </div>
  );
};

export default Login;
