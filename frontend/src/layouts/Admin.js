import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";

const Admin = () => {
  const { showSidebar } = useSelector((state) => state.dashboard);
  const { isLoading } = useSelector((state) => state.token);

  return (
    <>
      {isLoading ? null : (
        <div className="relative flex min-h-screen bg-blue-100">
          {/* Sidebar */}
          <div
            className={`bg-slate-900 fixed w-64 left-0 inset-y-0 h-full transform duration-300 transition ease-in-out z-10  ${
              showSidebar ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <Sidebar />
          </div>
          {/* Main Content */}
          <div
            className={`flex-1 transform duration-300 h-full overflow-hidden ${
              showSidebar ? "md:ml-0" : "md:ml-64"
            } `}
          >
            <Header />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
