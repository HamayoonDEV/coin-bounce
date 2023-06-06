import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Navbar.css";
import { signout } from "../api/internal";
import { resetUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const isAuthanticated = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="logo inactiveStyle">
          CoinBounce
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inactiveStyle"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inactiveStyle"
          }
          to="/crypto"
        >
          CryptoCurrenies
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inactiveStyle"
          }
          to="/blog"
        >
          Blogs
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inactiveStyle"
          }
          to="/submit"
        >
          Submit a blog
        </NavLink>
        {isAuthanticated ? (
          <div>
            {" "}
            <NavLink>
              <button className="signOutButton" onClick={handleSignOut}>
                sign Out
              </button>
            </NavLink>
          </div>
        ) : (
          <div>
            {" "}
            <NavLink to="/login">
              <button className="loginButton"> LogIn</button>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "activeStyle" : "inactiveStyle"
              }
              to="/signup"
            >
              <button className="signUpButton"> Sign Up </button>
            </NavLink>
          </div>
        )}
      </nav>
      <div className="seprator"></div>
    </>
  );
};

export default Navbar;
