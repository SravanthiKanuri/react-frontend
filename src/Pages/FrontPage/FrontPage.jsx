import React from 'react';
import Navbar from '../../components/NavbarFront/NavbarFront'
import { Outlet } from 'react-router-dom';


const FrontPage = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}

export default FrontPage