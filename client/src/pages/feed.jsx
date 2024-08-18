import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const fetchPosts = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/posts`,
      {
        params: { page: pageParam, limit: 4 },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw error;
    }
  }
};

function Feed() {
  const loader = useRef(null);
  const navigate = useNavigate();
  const { id: currentUserId } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.length === 4;
      return hasMore ? allPages.length + 1 : undefined;
    },
    onError: (error) => {
      if (error.message === "Unauthorized") {
        navigate("/login");
      }
    },
  });

  const posts = data?.pages.flat() || [];

  const handleScroll = useCallback(() => {
    if (loader.current) {
      const loaderTop = loader.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (loaderTop < windowHeight && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  return (
    <div className="feed-container p-4">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            username={post.author.username}
            imageUrl={post.imageUrl}
            initialLikeCount={post.likes.length}
            isLiked={post.likes.includes(currentUserId)}
          />
        ))
      )}
      <div ref={loader} className="loader mt-4">
        {isFetchingNextPage && <p>Loading more posts...</p>}
      </div>
    </div>
  );
}

export default Feed;
