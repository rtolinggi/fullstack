import { LogoutIcon, MenuIcon, UserIcon } from "@heroicons/react/solid";
import userIcon from "../assets/images/user-round.svg";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSidebar,
  openSidebar,
} from "../features/dashboard/dashboardSlice";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const handleShowSidebar = () => {
    dashboard.showSidebar ? dispatch(closeSidebar()) : dispatch(openSidebar());
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div className="bg-white px-6 py-3 shadow-lg flex justify-between items-center">
        <button
          onClick={handleShowSidebar}
          className="group hover:bg-teal-300 rounded-md p-1 transform duration-200 focus:ring-[2px] focus:ring-teal-200"
        >
          <MenuIcon className="w-6 h-6 text-teal-700 group-hover:text-white transform duration-200" />
        </button>
        <Menu as="div" className="relative">
          <Menu.Button className="group hover:bg-teal-300  rounded-full p-[2px] transform duration-200 focus:ring-[2px] focus:ring-teal-200 outline-none">
            <img src={userIcon} className="w-full h-full" alt="profil" />
          </Menu.Button>
          <Transition
            enter="transition duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items className="absolute top-full right-0 bg-white shadow-lg rounded-md outline-none px-1 py-2 flex flex-col w-44 text-sm divide-y divide-gray-10 -tracking-tighter text-gray-600">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex items-center hover:bg-teal-400 rounded px-4 py-2 hover:text-white w-full text-left transition duration-200 ${
                      active && "bg-teal-400 text-white"
                    }`}
                    onClick={() => console.log("klik")}
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    Account settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex items-center hover:bg-teal-400 rounded px-4 py-2 hover:text-white w-full text-left transition duration-200 ${
                      active && "bg-teal-400 text-white"
                    }`}
                    onClick={() => handleLogout()}
                  >
                    <LogoutIcon className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default Header;
