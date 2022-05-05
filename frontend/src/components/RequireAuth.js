import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { getToken } from "../features/token/tokenSlice";

const RequireAuth = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.token);
  const location = useLocation();

  useEffect(() => {
    dispatch(getToken());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isSuccess ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
