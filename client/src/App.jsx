import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageUpload from "./components/imageUpload";

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/protected",
          {
            withCredentials: true, // Ensures cookies are sent with the request
          }
        );

        setUsername(response.data.username);
      } catch (error) {
        console.error("Authentication failed:", error);
        setUsername(null);
      }
    };

    checkAuth(); // Check authentication status on component mount
  }, []);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleLogin = () => {
    window.location.href = `${SERVER_URL}/auth/google`;
  };

  return (
    <>
      <nav className="flex w-full text-2xl bg-zinc-700 justify-evenly items-center [&>a:hover]:text-blue-500 h-12">
        <a href="/me">Me</a>
        <a href="/feed">Feed</a>
        <a href="/">Home</a>
        <a href="/upload">Upload</a>
      </nav>
      <Router>
        <Routes>
          <Route
            path="/me"
            element={<Me username={username} handleLogin={handleLogin} />}
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

function Me({ username, handleLogin }) {
  return (
    <div className="content h-full">
      <h1 className="w-full text-center text-4xl mt-4">Me Page</h1>
      <div className="flex w-full justify-center items-center h-full">
        {username ? (
          <h1 className="w-full text-center text-4xl mt-4">Hi, {username}</h1>
        ) : (
          <button
            onClick={handleLogin}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}

function Feed() {
  return <h1 className="w-full text-center text-4xl mt-4">Feed Page</h1>;
}

function Upload() {
  return (
    <>
      <h1 className="w-full text-center text-4xl mt-4">Upload Page</h1>
      <ImageUpload />
    </>
  );
}

function Home() {
  return <h1 className="w-full text-center text-4xl mt-4">Home Page</h1>;
}

export default App;
