import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/profile";
import Feed from "./pages/feed";
import Upload from "./pages/upload";
import Login from "./pages/login";
import "./index.css";

function App() {
  const { username, isLoading, isError, handleLogin } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="w-24 h-2 bg-gray-300 mb-4"></div>
          <div className="w-48 h-2 bg-gray-300 mb-2"></div>
          <div className="w-32 h-2 bg-gray-300"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <Router>
      <nav
        className={`flex w-full py-6 text-2xl bg-zinc-800 border-b border-b-gray-500 justify-evenly items-center [&>a:hover]:text-blue-500 h-12 ${
          isLoading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <a href="/feed">Feed</a>
        <a href="/upload">Upload</a>
        {username ? (
          <a
            href={`/user/${username}`}
            className="text-blue-500 hover:text-blue-700 text-lg font-medium"
          >
            {username}
          </a>
        ) : (
          <a
            href="/signup"
            className="text-blue-500 hover:text-blue-700 text-lg font-medium"
          >
            Login
          </a>
        )}
      </nav>
      <Routes>
        <Route path="/signup" element={<Login handleLogin={handleLogin} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/feed"
          element={username ? <Feed /> : <Navigate to="/signup" />}
        />
        <Route
          path="/upload"
          element={username ? <Upload /> : <Navigate to="/signup" />}
        />
        <Route path="/user/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
