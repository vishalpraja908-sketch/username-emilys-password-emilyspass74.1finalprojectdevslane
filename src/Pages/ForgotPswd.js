 import React from 'react'
import { PiShoppingCartThin } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';



function callForgotPasswordApi(values) {
    console.log(values.email)
}

const Schema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format hai' )
        .required('Email dalna jaruri ha ')
})

const ForgotPassword = () => {
    const { handleChange, handleBlur, touched, handleSubmit, errors } = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: callForgotPasswordApi,
        validationSchema: Schema
    })
    
    return (
        <div className='flex justify-center items-center w-full bg-blue-500 h-full py-20'>
            <form onSubmit={handleSubmit}>
                <div className='w-auto flex flex-col'>
                    <PiShoppingCartThin className='text-white text-[150px] ml-10 md:ml-18' />
                    <h1 className='md:text-3xl text-2xl self-center text-white font-semibold font-sans underline'>
                        Reset your password
                    </h1>
                    <span className='w-80 text-white/70 mt-5'>
                        <p>Enter your registered email to receive password reset instructions.</p>
                    </span>
                    
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
                    
                    <button 
                        type="submit"
                        className='bg-white hover:shadow-2xl hover:transition-shadow shadow-red-500/50 mb-5 w-80 h-10 rounded text-blue-700 mt-6 hover:bg-gray-100'
                    >
                        Reset Password
                    </button>
                    
                    <div className='self-center text-white text-sm'>
                        <p>Go to Login? <Link to={"/login"} className='underline'>Login</Link></p>
                    </div>
                    
                    <Link to={'/'} className='text-white underline self-center mt-3'>Back to store!</Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword;