import React from "react";
import { Link } from "react-router-dom";

function Navbar({ username, handleLogin }) {
  
  return (
    <nav className="flex w-full py-6 text-2xl bg-zinc-800 border-b border-b-gray-500 justify-evenly items-center [&>a:hover]:text-blue-500 h-12">
      {/* {username ? (
        <Link
          to={`/user/${username}`}
          className="text-white hover:text-blue-500"
        >
          {username}
        </Link>
      ) : (
        <button
          onClick={handleLogin}
          className="text-blue-500 hover:text-blue-700"
        >
          Login
        </button>
      )} */}
      <Link to="/user" className="text-white hover:text-blue-500">
        Profile
      </Link>
      <Link to="/feed" className="text-white hover:text-blue-500">
        Feed
      </Link>
      <Link to="/upload" className="text-white hover:text-blue-500">
        Upload
      </Link>
    </nav>
  );
}

export default Navbar;
