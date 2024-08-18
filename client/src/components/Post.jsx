import React from 'react';

function Post({ username, imageUrl }) {
  return (
    <div className="post-box p-4 mb-4 rounded-lg shadow-md w-1/2 bg-zinc-950">
      <div className="username text-lg font-bold mb-2">{username}</div>
      <img src={imageUrl} alt="Post" className="w-full h-auto mb-2" />
      <div className="actions flex justify-between">
        <button className="like-button bg-blue-500 text-white p-2 rounded">Like</button>
        <button className="share-button bg-green-500 text-white p-2 rounded">Share</button>
      </div>
    </div>
  );
}

export default Post;
