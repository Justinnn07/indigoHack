import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useCurrentUser} from "../../Hooks";
import {AiOutlineUser} from "react-icons/ai";

function Header() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const loggedUser = useCurrentUser()

  return (
    <nav className="bg-white 0 fixed w-full z-20 top-0 start-0 border-b">
      {/*eslint-disable*/}

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/">
          <img
              src="https://www.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png"
              className="h-8"
              alt=""
          />
        </a>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium   rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                <li>
                    <a
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            navigate('/')
                        }}

                        className={`block rounded ${pathname === '/' ? "text-blue-700" : "black"} md:p-0`}
                        aria-current="page">Home</a>
                </li>

                {
                    loggedUser?.is_admin && (
                        <>
                            <li><a
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    navigate('/manage/flights')
                                }}
                                className={`block rounded ${pathname === '/manage/flights' ? "text-blue-700" : "black"} md:p-0 `}
                                aria-current="page">Manage Flights</a>
                            </li>
                            <li>
                                <a
                                    onClick={() => {
                                        navigate('/create/flight')
                                    }}
                                    style={{
                                        cursor: 'pointer'
                                    }}

                                    className={`block rounded ${pathname === '/create/flight' ? "text-blue-700" : "black"} md:p-0 `}
                                    aria-current="page">Create Flight</a>

                            </li>
                            <li>
                                <a
                                    onClick={() => {
                                        navigate('/create/user')
                                    }}
                                    style={{
                                        cursor: 'pointer'
                                    }}

                                    className={`block rounded ${pathname === '/create/user' ? "text-blue-700" : "black"} md:p-0 `}
                                    aria-current="page">Create Users</a>
                            </li>
                            <li>
                                <a
                                    onClick={() => {
                                        navigate('/manage/users')
                                    }}
                                    style={{
                                        cursor: 'pointer'
                                    }}

                                    className={`block rounded ${pathname === '/manage/users' ? "text-blue-700" : "black"} md:p-0 `}
                                    aria-current="page">Manage Users</a>
                            </li>
                        </>
                    )


                }


            </ul>
        </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

              {
                  loggedUser ? (
                      <button onClick={() => {
                          localStorage.clear()
                          window.location.reload()
                      }}>
                          <AiOutlineUser size={25}/>
                      </button>
                  ) : (
                      <button
                          type="button"
                          onClick={() => {
                              navigate("/login");
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                          Login
                      </button>
                  )

              }

          </div>
      </div>
    </nav>
  );
}

export default Header;
