import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Auth(){
  

const getToken = localStorage.getItem("token")

  return(
    <>
    {getToken?<Outlet/>:<Navigate to="/login"/>}
    
    </>
    )
   

}
export default Auth