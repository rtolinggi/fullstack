import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className='flex min-h-screen min-w-full justify-center items-center px-2 py-2 bg-gradient-to-br from-slate-400 to-white'>
        <Outlet />
      </div>
    </>
  );
};

export default Auth;
