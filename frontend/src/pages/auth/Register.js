import { NavLink, useNavigate } from "react-router-dom";
import {
  ExclamationIcon,
  EyeIcon,
  EyeOffIcon,
  LockClosedIcon,
  MailIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import ImageRegis from "../../assets/images/regis.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [closeMessage, setCloseMessage] = useState(true);

  const dispatch = useDispatch();
  const { message, isSuccess, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, navigate, isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const postData = {
      name,
      email,
      password,
      confirmPassword,
    };
    dispatch(register(postData)).then(() => {
      closeMessage || message !== ""
        ? setCloseMessage(false)
        : setCloseMessage(true);
    });
  };

  const handlePasswordShow = () => {
    if (password.length !== 0 || confirmPassword.length !== 0) {
      return !showPassword ? (
        <EyeOffIcon
          className="w-5 h-5 absolute right-2 top-7 text-teal-600 cursor-pointer"
          onClick={() => setShowPassword(true)}
        />
      ) : (
        <EyeIcon
          className="w-5 h-5 absolute right-2 top-7 text-teal-600 cursor-pointer"
          onClick={() => setShowPassword(false)}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex w-full max-w-3xl">
      {/* Login Content */}
      <div className="flex w-full max-w-sm lg:max-w-md mx-auto">
        <form
          onSubmit={handleRegister}
          className="flex flex-col mx-auto bg-white w-full rounded-xl shadow-xl lg:rounded-tl-xl lg:rounded-bl-xl lg:rounded-tr-none lg:rounded-br-none items-center justify-center px-8 py-8"
        >
          <h1 className="text-xl font-extrabold tracking-tighter text-teal-700">
            SIGN UP
          </h1>
          <hr className="w-10 border-2 bg-teal-700 border-teal-700 rounded-full" />
          <p className="text-sm font-normal text-gray-500 text-center -tracking-tighter mt-2">
            Please Register Youre Information
          </p>
          {closeMessage ? null : (
            <div
              id="message"
              className="flex items-center p-2.5 -mb-4 bg-red-100 rounded-sm dark:bg-red-200 w-full mt-4 border-l-4 border-l-red-400"
            >
              <ExclamationIcon className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" />
              <div className="ml-3 text-xs -tracking-tighter font-medium text-red-700 dark:text-red-800">
                {message}
              </div>
              <button
                type="button"
                onClick={() => setCloseMessage(true)}
                className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          <hr className="text-slate-400 border-1 w-full mt-6" />
          <div className="space-y-4 w-full mt-6">
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="name"
                className="text-xs text-gray-700 font-medium -tracking-tighter mb-1"
              >
                Username
              </label>
              <UserIcon className="absolute left-0 top-7 w-5 h-5 text-slate-500 ml-2" />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Username"
                className="bg-slate-200/70 py-2 px-2 text-sm pl-8 font-normal text-slate-700 outline-none focus:border focus:border-teal-200 focus:ring focus:ring-teal-100 focus:bg-white rounded-md "
                autoComplete="off"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="email"
                className="text-xs text-gray-700 font-medium -tracking-tighter mb-1"
              >
                Email
              </label>
              <MailIcon className="absolute left-0 top-7 w-5 h-5 text-slate-500 ml-2" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="bg-slate-200/70 py-2 px-2 text-sm pl-8 font-normal text-slate-700 outline-none focus:border focus:border-teal-200 focus:ring focus:ring-teal-100 focus:bg-white rounded-md "
                autoComplete="off"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="password"
                className="text-xs text-gray-700 font-medium -tracking-tighter mb-1"
              >
                Password
              </label>
              <LockClosedIcon className="absolute left-0 top-7 w-5 h-5 text-slate-500 ml-2" />
              <input
                id="password"
                name="password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-slate-200/70 py-2 px-2 pl-8 text-sm font-normal text-slate-700 outline-none focus:border focus:border-teal-200 focus:ring focus:ring-teal-100 focus:bg-white rounded-md"
                value={password}
                onChange={onChange}
              />
              {handlePasswordShow()}
            </div>
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="confirmPassword"
                className="text-xs text-gray-700 font-medium -tracking-tighter mb-1"
              >
                Password Confirmation
              </label>
              <LockClosedIcon className="absolute left-0 top-7 w-5 h-5 text-slate-500 ml-2" />
              <input
                id="passwordConfirmation"
                name="confirmPassword"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password Confirmation"
                className="bg-slate-200/70 py-2 px-2 pl-8 text-sm font-normal text-slate-700 outline-none focus:border focus:border-teal-200 focus:ring focus:ring-teal-100 focus:bg-white rounded-md"
                value={confirmPassword}
                onChange={onChange}
              />
              {handlePasswordShow()}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="text-white outline-none bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-8 py-2.5 w-full mr-2 mt-6 lg:w-fit lg:self-start"
          >
            {isLoading ? (
              <>
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
          <hr className="text-slate-400 border-1 w-full mt-6" />
          <p className="text-xs text-slate-600 -tracking-tighter font-medium mt-6 text-center">
            Already an Account ?{" "}
            <NavLink to={"/"}>
              <span className="font-extrabold text-teal-700 tracking-tighter">
                SIGN IN
              </span>
            </NavLink>
          </p>
        </form>
      </div>
      {/* Register Content */}
      <div className="hidden lg:flex lg:flex-grow lg:max-w-xs rounded-tr-xl rounded-br-xl shadow-xl justify-center items-center bg-teal-600/30">
        <img src={ImageRegis} alt="Login Content" className="h-full w-full" />
      </div>
    </div>
  );
};

export default Register;
