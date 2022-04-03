import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../features/token/tokenSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(getToken())
      .then((res) => {
        const result = res.payload;
        return result;
      })
      .then((result) => {
        if (!result.token) {
          navigate("/");
        }
      });
  }, [dispatch, navigate]);

  return (
    <div className=" bg-gray-50 mt-12 mx-8 py-8 px-6 rounded-xl">
      <h1 className="text-2xl text-teal-500 font-medium">Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
