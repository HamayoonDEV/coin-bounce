import "./App.css";
import Navbar from "./compnents/Navbar";
import Footer from "./compnents/Footer";
import Home from "./pages/Home";
import Protected from "./compnents/protected/protected";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Crypto from "./pages/Crypto";
import Blogs from "./pages/Blogs";
import SubmitBlog from "./pages/SubmitBlog";
import BlogDtails from "./pages/BlogDtails";
import UpdateBlog from "./pages/UpdateBlog";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.user.auth);
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <div className="layout">
          <Routes>
            <Route
              path="/"
              element={
                <div className="main">
                  <Home />
                </div>
              }
            />

            <Route
              path="/crypto"
              element={
                <div className="main">
                  <Crypto />
                </div>
              }
            />

            <Route
              path="/blog"
              element={
                <Protected isAuth={isAuth}>
                  <div className="main">
                    <Blogs />
                  </div>
                </Protected>
              }
            />

            <Route
              path="/blog/:id"
              element={
                <Protected isAuth={isAuth}>
                  <div className="main">
                    {" "}
                    <BlogDtails />
                  </div>
                </Protected>
              }
            />

            <Route
              path="/blog/update/:id"
              element={
                <Protected isAuth={isAuth}>
                  <div className="main">
                    {" "}
                    <UpdateBlog />
                  </div>
                </Protected>
              }
            />

            <Route
              path="/submit"
              element={
                <Protected isAuth={isAuth}>
                  <div className="main">
                    <SubmitBlog />
                  </div>
                </Protected>
              }
            />

            <Route
              path="/login"
              element={
                <div className="main">
                  <Login />
                </div>
              }
            />

            <Route
              path="/signup"
              element={
                <div className="main">
                  <Signup />
                </div>
              }
            />

            <Route
              path="/*"
              element={
                <div className="main">
                  <Error />
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
