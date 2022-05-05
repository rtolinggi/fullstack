import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../features/token/tokenSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/admin";
  const { isLoading } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(getToken())
      .then((res) => {
        const result = res.payload;
        return result;
      })
      .then((result) => {
        if (result?.token) return navigate(from, { replace: true });
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? null : (
        <div className="flex min-h-screen min-w-full justify-center items-center px-2 py-2 bg-gradient-to-br from-slate-400 to-white">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Auth;
