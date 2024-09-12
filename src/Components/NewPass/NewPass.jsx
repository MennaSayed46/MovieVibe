import React, { useState, useEffect, useContext } from "react";
import style from './NewPass.module.css'
import { useFormik } from 'formik';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'

export default function NewPass() {
  let { setuserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('email is invalid').required('email is required'),
    newPassword: Yup.string().matches(/^[A-Za-z][A-Za-z0-9]{5,15}$/, `must be
* Start with a letter .
* Be between 5 and 15 characters totally.
* Can only contain letters (A-Z or a-z) and numbers (0-9)`).required('password is required'),
  });


  async function handleNewPassword(values) {

    setIsLoading(true)
    await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((response) => {
        if (response.data) {

          navigate('/login')

        }
        console.log(response.data);

        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);

        setIsLoading(false)
        setApiError(error?.response?.data?.statusMsg)
      })

  };


  let formik = useFormik({
    initialValues: {

      email: '',
      newPassword: '',

    },
    validationSchema: validationSchema,
    onSubmit: handleNewPassword


  });

  let navigate = useNavigate();
  return (
    <>
      <div className={`py-6 mx-auto mt-9 lg:w-5/6 ${style.centerY}`}>

        {apiError ? <div class="p-4 mb-4 text-sm text-red-600 border-rose-800 rounded-lg bg-red-50" role="alert">
          {apiError}
        </div> : null}
        <h2 className={`text-3xl font-bold mb-5 pt-6 ${style.title}`}>Reset Password</h2>


        <form onSubmit={formik.handleSubmit} className="">


          <div className="relative z-0 w-full mb-5 group">
            <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-white dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-white dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
          </div>
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-600 border-rose-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.email}
          </div> : null}

          <div className="relative z-0 w-full mb-5 group">
            <input id="newPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-white dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-white dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword :</label>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword ? <div class="p-4 mb-4 text-sm text-red-600 border-rose-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.newPassword}
          </div> : null}


          <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-auto">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : `submit`}

          </button>


        </form>
      </div>

    </>
  )
}
