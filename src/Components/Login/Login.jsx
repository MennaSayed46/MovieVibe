import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.css';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup'
import { Formik, useFormik } from 'formik';
import { UserContext } from '../../Context/UserContext';
import img from '../../assets/try.png';

export default function Login() {
  let navigate = useNavigate();
  let [APIERR, setAPIERR] = useState(null);
  let [loadingSpinner, setloadingSpinner] = useState(false);
  let { setUserData } = useContext(UserContext);

  async function loginForm(values) {
    console.log('the values of login ', values);
    try {
      setloadingSpinner(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      console.log('the data of register', data);
      localStorage.setItem('userToken', data.token);
      navigate('/');
      setloadingSpinner(false);
      console.log('succcess log');
      setUserData(data.token);



    } catch (err) {
      setAPIERR(err.response.data.message);
      setloadingSpinner(false);
    }

  };



  let validationSchema = yup.object().shape({

    email: yup.string().email('email is invalid').required('email is required'),
    password: yup.string().matches(/^[A-Z]\w{5,15}$/, 'password is invalid').required('password is required'),

  });




  let formik = useFormik({
    initialValues: {
      "email": "",
      "password": "",
    }, validationSchema,
    onSubmit: loginForm


  })




  return (
    <>
      <div className={`my-4 text-white`} style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '400px',




      }} >

        <form onSubmit={formik.handleSubmit} className="max-w-md h-screen flex flex-col items-center justify-center mx-auto ">
          <p className='pb-14 text-2xl font-semibold'> Log in your account</p>
          {APIERR && <div className='text-center text-red-600 font-semibold'>{APIERR}</div>}



          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark: dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark: dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
          </div>

          <div className='mb-4'>

            <p className="text-center">Don't have account? <Link className="text-red-600 font-medium underline" to="/register">Register</Link></p>
            <p className="text-center">Forget Password ? <Link className="text-red-600 font-medium underline" to="/forget">Tap here</Link></p>
            {loadingSpinner ? <button type='submit' className='mt-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm  sm:w-auto px-5 py-3 px-6 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'><i className="fa-solid fa-spinner fa-pulse"></i></button> : <button type='submit' className='my-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-xl  sm:w-auto py-3 px-6 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Submit</button>}

          </div>
        </form>








      </div>
    </>
  )
}
