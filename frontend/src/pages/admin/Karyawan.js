import { PencilIcon, UserAddIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { getToken } from "../../features/token/tokenSlice";
import {
  deleteKaryawan,
  getKaryawan,
} from "../../features/karyawan/karyawanSlice";
import { FaTrash } from "react-icons/fa";

const Karyawan = () => {
  const dispatch = useDispatch();
  const clickRef = React.useRef(null);
  const { token } = useSelector((state) => ({ ...state.token }));
  const { karyawan } = useSelector((state) => state.karyawan);

  const handleDelete = (id) => {
    console.log(id);
    // dispatch(
    //   deleteKaryawan({
    //     params: id,
    //   })
    // );
  };

  useEffect(() => {
    const getDataKaryawan = async () => {
      const { exp } = jwtDecode(token.token);
      const currentDate = new Date();
      if (exp * 1000 < currentDate.getTime()) {
        const newToken = await dispatch(getToken()).then((res) => {
          return res.payload.token;
        });
        dispatch(
          getKaryawan({
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          })
        );
      } else {
        dispatch(
          getKaryawan({
            headers: {
              Authorization: "Bearer " + token.token,
            },
          })
        );
      }
    };
    getDataKaryawan();
  }, [dispatch, token.token]);

  return (
    <>
      <div className=' bg-white min-h-screen mt-12 mx-8 py-8 px-6 rounded-xl rounded-b-none'>
        <h1 className='text-xl text-teal-500 font-medium border-l-4 border-teal-500 -tracking-tighter pl-2'>
          Karyawan
        </h1>
        <div className='w-full relative mt-4 rounded shadow-md bg-white overflow-hidden'>
          <div className='w-full bg-gray-300 opacity-80 px-6 flex justify-end items-center py-2.5'>
            <button
              type='submit'
              className='text-white flex items-center outline-none bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-md text-sm px-4 py-2.5  mr-2'
              // onClick={getDataKaryawan}
              ref={clickRef}>
              <UserAddIcon className='w-4 h-4 mr-2' />
              Add
            </button>
          </div>
          <div className='relative px-4 py-2.5 overflow-x-auto shadow-md sm:rounded-lg'>
            <div className='p-4'>
              <label htmlFor='table-search' className='sr-only'>
                Search
              </label>
              <div className='relative mt-1'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  id='table-search'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'
                  placeholder='Search for items'
                />
              </div>
            </div>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
              <thead className='text-xs text-gray-200 uppercase bg-teal-600  dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='p-4'>
                    No
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    FULL NAME
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    NIK
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    POSITION
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    ACTIVE
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {karyawan?.data
                  ? karyawan.data.map((el, item) => {
                      return (
                        <tr
                          key={item}
                          className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-gray-600'>
                          <td className='w-4 p-4'>{(item = item + 1)}</td>
                          <th
                            scope='row'
                            className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'>
                            {el.name}
                          </th>
                          <td className='px-6 py-4'>{el.nik}</td>
                          <td className='px-6 py-4'>{el.position}</td>
                          <td className='px-6 py-4'>
                            {el.active ? (
                              <div className='w-4 h-4 bg-green-600'></div>
                            ) : (
                              <div className='w-4 h-4 bg-red-600'></div>
                            )}
                          </td>
                          <td className='px-6 py-4'>
                            <button
                              className='p-1 bg-emerald-600 rounded hover:bg-emerald-500 mr-1'
                              onClick={() => console.log(token?.token)}>
                              <PencilIcon className='w-4 h-4 text-gray-200' />
                            </button>
                            <button
                              className='p-1 bg-red-600 rounded hover:bg-red-500'
                              onClick={() => handleDelete(el._id)}>
                              <FaTrash className='w-4 h-4 text-gray-200' />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : "Loading"}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Karyawan;
