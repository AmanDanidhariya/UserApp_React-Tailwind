import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    Navigate("/");
  };

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex justify-between items-center h-16 sticky top-0 w-full mx-auto px-4  text-[#100F0F] bg-[#ecf4e7] z-10">
      <h1 className="w-full text-3xl font-medium">@amanCode</h1>
      <ul className=" font-medium hidden md:flex">
        {isLoggedIn ? (
          <>
            <li className="p-4 hover:text-gray-400">
              <Link to="/user">User</Link>
            </li>
            <li className="p-4 hover:text-gray-400">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="p-4 hover:text-gray-400">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="p-4 hover:text-gray-400">
              <Link to="/">Login</Link>
            </li>
          </>
        )}
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={22} />}
      </div>
      <div
        className={
          !nav
            ? "fixed font-medium left-0 top-0 h-full w-[40%] border-r-2 border-r-gray-900 bg-[#ecf4e7] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-medium m-4 z-10">AmanCode</h1>
        <ul className="p-4 uppercase">
          {isLoggedIn ? (
            <>
              <li className="p-4 hover:text-gray-400 border-b-2 border-black">
                <Link to="/user">User</Link>
              </li>
              <li className="p-4 hover:text-gray-400 border-b-2 border-black">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="p-4 hover:text-gray-400 border-b-2 border-black">
                <Link to="/signup">Signup</Link>
              </li>
              <li className="p-4 hover:text-gray-400 border-b-2 border-black">
                <Link to="/">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
