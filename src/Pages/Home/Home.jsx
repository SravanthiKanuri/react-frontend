import React from 'react';
import Navbar from '../../components/Navbar/Navbar1';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Navbar/>
      
      <Outlet />
      {/* <div >
        <h1>Wellcome HomePage</h1>
      </div> */}
        
    </>
  )
}

export default Home