import React, { useState, useEffect, useContext } from "react";
import style from './Reset.module.css';
import { useFormik } from 'formik';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Reset() {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function handleResetCode(formValues) {
    try {
      setIsLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
      console.log(data);

      if (data.status === 'Success') {
        navigate('/NewPass')
      }
      setIsLoading(false)
    }
    catch (error) {
      setIsLoading(false)
      setApiError(error?.data?.message)
    }


  }

  let formik = useFormik({
    initialValues: {

      resetCode: '',


    },
    onSubmit: handleResetCode


  });

  return (
    <>
      <div className={` py-6 mx-auto mt-9 lg:w-5/6 ${style.centerY}`}>

        {apiError ? <div class="p-4 mb-4 text-sm text-red-600 border-rose-800 rounded-lg bg-red-50" role="alert">
          {apiError}
        </div> : null}
        <h2 className={`${style.title}   mb-6 `}>Reset code</h2>


        <form onSubmit={formik.handleSubmit} className="">


          <div className="relative z-0 w-full mb-5 group">
            <input id="resetCode" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" name="resetCode" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:border-white dark:focus:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " />
            <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset Code :</label>
          </div>

          <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-auto">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : `submit`}

          </button>
        </form>
      </div>

    </>
  )
}
