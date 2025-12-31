import { useFormik } from 'formik';
import React from 'react';
import { PiShoppingCartThin } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

import axios from "axios";
const SignUp = () => {
     const navigate = useNavigate();
    function callSignUpApi(values){
       axios
    .post("https://dummyjson.com/users/add", {
     fullName: values.username,
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      console.log("Signup successful", response.data);
      alert("signUp successfully ");
      navigate("/login");
    })
    .catch((error) => {
      if (error.response) {
        console.log("Signup error", error.response.data);
        alert(
          "Signup failed: " +
            (error.response.data.message || JSON.stringify(error.response.data))
        );
      } else if (error.request) {
        console.log("No response received", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.log("Error", error.message);
        alert("Error: " + error.message);
      }
    });
  
}



    
    const Schema = Yup.object().shape({
        username: Yup.string()
            .min(5, 'Username kam se 5 ka hona chaiye')
            .required('Username jarurri ha'),
        email: Yup.string()
            .email('Invalid email format hai')
            .required('Email dalna jaruri ha'),
        password: Yup.string()
            .min(8, 'Password 8  character hona chaiye')
            .required('Password dalna jaruri ha '),
        confirmPassword: Yup.string() 
            .oneOf([Yup.ref('password'), null], 'Passwords  match')
            .required('kya aapka password confirm ha')
    })
    
    const {handleBlur, touched, handleChange, handleSubmit,  errors} = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "" 
        },
        onSubmit: callSignUpApi,
        validationSchema: Schema
    })
    
    return (
        <div className='flex justify-center items-center w-full h-full  min-h-screen bg-blue-500 '>
            <form onSubmit={handleSubmit}>
                <div className='w-auto flex flex-col'>
                    <PiShoppingCartThin className='text-white text-[150px] ml-10 md:ml-18' />
                    
                    <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name="email" 
                        type="email" 
                        placeholder='Email' 
                        className='border border-white mt-3 rounded bg-transparent text-white pl-3 h-12 w-80 placeholder-white/70'
                    />
                    {touched.email && errors.email && (
                        <div className='text-red-300 text-sm mt-1'>{errors.email}</div>
                    )}
                    
                    <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name="username" 
                        type="text" 
                        placeholder='Username' 
                        className='border border-white mt-3 rounded bg-transparent text-white pl-3 h-12 w-80 placeholder-white/70' 
                    />
                    {touched.username && errors.username && (
                        <div className='text-red-300 text-sm mt-1'>{errors.username}</div>
                    )}
                    
                    <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name="password" 
                        type="password" 
                        placeholder='Password' 
                        className='border border-white mt-3 rounded bg-transparent text-white pl-3 h-12 w-80 placeholder-white/70' 
                    />
                    {touched.password && errors.password && (
                        <div className='text-red-300 text-sm mt-1'>{errors.password}</div>
                    )}
                    
                    <input 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        name="confirmPassword" 
                        type="password" 
                        placeholder='Confirm Password' 
                        className='border border-white mt-3 rounded bg-transparent text-white pl-3 h-12 w-80 placeholder-white/70' 
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <div className='text-red-300 text-sm mt-1'>{errors.confirmPassword}</div>
                    )}
                    
                    <button 
                        type="submit"
                        className='bg-white hover:shadow-2xl hover:transition-shadow shadow-red-500/50 mb-5 w-80 h-10 rounded text-blue-700 mt-6 hover:bg-gray-100' 
                    >
                        Sign Up
                    </button>
                    
                    <div className='self-center text-white text-sm'>
                        <p>Already have an account? <Link to={"/login"} className='underline'>Login</Link></p>
                    </div>
                    
                    <Link to={'/'} className='text-white underline self-center mt-3'>Back to home!</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp;