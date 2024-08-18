import React from "react";

function Login({ handleLogin }) {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="flex justify-center items-center py-40">
      <div className="bg-zinc-900 p-16 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">
          Welcome
        </h1>
        <div className="mb-6 text-center text-2xl font-medium">
          <button
            onClick={() => navigateTo("/signup")}
            className="text-blue-500 hover:text-blue-700"
          >
            Sign Up
          </button>
          <span className="mx-4">|</span>
          <button
            onClick={() => navigateTo("/login")}
            className="text-blue-500 hover:text-blue-700"
          >
            Login
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full text-lg px-2 py-2 md:px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
