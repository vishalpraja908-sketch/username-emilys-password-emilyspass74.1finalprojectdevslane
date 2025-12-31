import React from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { GiHouseKeys } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  
  function callLoginApi(values) {
    axios
      .post("https://dummyjson.com/auth/login", {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        console.log("Login success:", response.data);

        localStorage.setItem("token", response.data.token);
        setUser(response.data);

        alert("Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.log("Login error:", error.response?.data || error);
        alert("Invalid username or password");
      });
  }

 
  const Schema = Yup.object().shape({
    username: Yup.string().required("Username dalna jaruri hai"),
    password: Yup.string()
      .min(8, "Password kam se kam 8 character ka hona chahiye")
      .required("Password dalna jaruri hai"),
  });

  
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit: callLoginApi,
      validationSchema: Schema,
    });

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-blue-500">
      <form onSubmit={handleSubmit}>
        <div className="w-auto flex flex-col items-center">
          <PiShoppingCartThin className="text-white text-[150px] mb-8" />

         
          <div className="relative mt-5">
            <CiUser className="absolute text-3xl top-3 left-3 text-white" />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-white rounded bg-transparent text-white pl-12 h-12 w-80 placeholder-white/70"
            />
            {touched.username && errors.username && (
              <div className="text-red-300 text-sm mt-1">
                {errors.username}
              </div>
            )}
          </div>

        
          <div className="relative mt-5">
            <GiHouseKeys className="absolute text-3xl top-3 left-3 text-white" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-white rounded bg-transparent text-white pl-12 h-12 w-80 placeholder-white/70"
            />
            {touched.password && errors.password && (
              <div className="text-red-300 text-sm mt-1">
                {errors.password}
              </div>
            )}
          </div>

       
          <button
            type="submit"
            className="bg-white text-blue-700 font-semibold mt-6 h-10 w-80 rounded hover:bg-gray-100"
          >
            Login
          </button>

          <Link
            to="/forgotpassword"
            className="text-white hover:underline text-sm mt-3"
          >
            Forgot Password?
          </Link>

          <p className="text-white text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </p>

          <Link to="/" className="text-white underline mt-3">
            Back to home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
