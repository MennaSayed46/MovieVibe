import { Navigate } from 'react-router-dom';
import style from'./ProtectedRoute.module.css'
import React from 'react'

export default function ProtectedRoute({children}) {
  if(localStorage.getItem('userToken')){
    return children;
  }else{
   return <Navigate to={'/login'}></Navigate>
  }

  
}