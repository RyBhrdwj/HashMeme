import React from "react";

function Profile({ username }) {
  return (
    <div className="content">
      <h1 className="w-full text-center text-4xl mt-4">Profile Page</h1>
      <div className="flex w-full justify-center items-center h-full">
        <h1 className="w-full text-center text-4xl mt-4">Hi, {username}</h1>
      </div>
    </div>
  );
}

export default Profile;
