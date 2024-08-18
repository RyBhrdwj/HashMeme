import React, { useState } from "react";
import axios from "axios";

function Post({ id, username, imageUrl, initialLikeCount, isLiked }) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}/like`, {
          withCredentials: true,
        });
        setLikeCount(likeCount - 1);
      } else {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}/like`, {}, {
          withCredentials: true,
        });
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="p-4 mb-4 rounded-lg shadow-md w-80 bg-zinc-950">
      <div className="username text-lg font-bold mb-2">{username}</div>
      <img src={imageUrl} alt="Post" className="w-64 h-auto m-auto" />
      <div className="actions flex justify-between">
        <button
          className={`like-button ${liked ? 'bg-blue-700' : 'bg-blue-500'} text-white p-2 rounded hover:bg-blue-600`}
          onClick={handleLike}
        >
          {liked ? `Liked (${likeCount})` : `Like (${likeCount})`}
        </button>
        <button
          className="share-button bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default Post;
