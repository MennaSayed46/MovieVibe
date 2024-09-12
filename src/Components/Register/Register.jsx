import React, { useContext, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'
import img from '../../assets/try.png';

export default function Register() {
  let navigate = useNavigate();
  let [APIERR, setAPIERR] = useState(null);
  let [loadingSpinner, setloadingSpinner] = useState(false);
  let { setUserData } = useContext(UserContext)
  async function registerForm(values) {
    // console.log(values);
    try {
      setloadingSpinner(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      console.log('the data of register', data);
      localStorage.setItem('userToken', data.token);
      navigate('/');
      setloadingSpinner(false);
      setUserData(data.token);






    } catch (err) {
      setAPIERR(err.response.data.message);
      setloadingSpinner(false);
    }

  };

  let validationSchema = yup.object().shape({
    name: yup.string().min(3, 'min length is 3').max(10, 'max length is 10').required('the name is required'),
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup.string().matches(/^[A-Z]\w{5,15}$/, 'password is invalid').required('password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('repassword is required'),
    phone: yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Invalid phone number').required('phone is required')
  });

  let formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    }, validationSchema,
    onSubmit: registerForm


  })


  return (
    <>
      <div className={`my-4`} style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '400px',
       



      }} >
        <form onSubmit={formik.handleSubmit} className="max-w-md h-screen flex flex-col items-center justify-center mx-auto ">
          <p className={`pb-14 text-2xl font-semibold text-white ${style.register}`}> Register</p>
          {APIERR && <div className='text-center text-red-600 font-semibold'>{APIERR}</div>}

          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handle} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark: dark:border-white dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-white  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            {formik.touched.name && formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
          </div>


          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark: dark:border-white dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-white  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark: dark:border-white dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-white  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark: dark:border-white dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-white  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>
            {formik.touched.rePassword && formik.errors.rePassword ? <div className="text-red-500">{formik.errors.rePassword}</div> : null}
          </div>


          <div className="relative z-0 w-full mb-5 group">
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark: dark:border-white dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-white  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            {formik.touched.phone && formik.errors.phone ? <div className="text-red-500">{formik.errors.phone}</div> : null}
          </div>

          {loadingSpinner ? <button type='submit' className='bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-xl  sm:w-auto py-3 px-6 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'><i className="fa-solid fa-spinner fa-pulse"></i></button> : <button type='submit' className='bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-xl  sm:w-auto py-3 px-6 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Submit</button>}




        </form>


      </div>




    </>
  )
}
