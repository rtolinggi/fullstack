import userIcon from "../../assets/images/user-round.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CubeIcon, ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { menuItem } from "./MenuSidebar";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../features/dashboard/dashboardSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.dashboard);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="flex flex-col h-full justify-between items-center px-2 py-4">
        <div className="w-full">
          <div className="flex rounded-md text-center py-2 items-center justify-center">
            <Link
              to={"/admin"}
              className="bg-teal-700 p-1 rounded flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <CubeIcon className="w-6 h-6 text-white hover:text-gray-700" />
            </Link>
            <h1 className="font-bold -tracking-tighter text-md text-center text-slate-100 ml-2">
              COLECCTION{" "}
              <span className="font-extrabold text-teal-400 text-xl">KMB</span>
              <ArrowCircleLeftIcon
                onClick={() => dispatch(openSidebar())}
                className={`absolute md:invisible -right-4 bg-white rounded-full outline-none border-none top-2 text-teal-700 w-8 h-8 cursor-pointer hover:bg-teal-200 hover:text-black ${
                  showSidebar && "-left-10"
                }`}
              />
            </h1>
          </div>
          <hr className="text-gray-200 my-2 mb-6" />
          <div className="pt-4 -tracking-tighter ">
            <span className="text-xs font-bold text-teal-400 -tracking-tighter">
              Menu
            </span>
            <ul className="flex flex-col space-y-2">
              {menuItem.map((element, index) => {
                if (!element.subMenu) {
                  return (
                    <li
                      key={index}
                      className="relative text-gray-300 hover:text-white focus-within:text-white transition transform duration-200"
                    >
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none ">
                        {element.menuIcon}
                      </div>
                      <Link
                        to={element.linkTo}
                        className="inline-block w-full py-2 pl-8 pr-4 text-sm rounded hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-teal-800"
                      >
                        {element.menuName}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="">
                      <div className="relative flex justify-between text-gray-300 hover:text-white focus-within:text-white transition transform duration-200">
                        <div className="flex items-center w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                            {element.menuIcon}
                          </div>
                          <Link
                            to={"#"}
                            onClick={() =>
                              isOpen ? setIsOpen(false) : setIsOpen(true)
                            }
                            className="inline-block w-full py-2 pl-8 pr-4 text-sm rounded hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-teal-800"
                          >
                            {element.menuName}
                          </Link>
                        </div>
                        <button
                          className={`absolute right-0 flex items-center p-2 transform duration-200  group ${
                            isOpen ? "-rotate-90 " : ""
                          }`}
                          tabIndex={-1}
                        >
                          <svg
                            className="w-5 h-5 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M15.25 10.75L12 14.25L8.75 10.75"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className={`${isOpen ? "hidden" : ""} pt-2`}>
                        <ul className="flex flex-col text-gray-100  bg-white/10 rounded-md">
                          {element.subMenuItem.map((el, item) => {
                            return (
                              <li key={item}>
                                <Link
                                  to={el.linkTo}
                                  className="inline-block w-full py-2 pl-8 pr-4 text-sm rounded hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-teal-800"
                                >
                                  {el.menuName}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>

        <div className="flex bg-white/10 w-full mx-1 py-2 rounded-md justify-center items-center">
          <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
            <img src={userIcon} className="w-full h-full" alt="profil" />
          </div>
          <div className="flex flex-col ml-4">
            <div className="text-sm text-gray-50">{user?.name}</div>
            <span className="text-sm text-gray-300 font-light tracking-tight">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
