import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/posts/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Meme uploaded successfully");
        setFile(null);
        event.target.reset();
      } else {
        toast.error("Meme upload unsuccessful");
      }
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="flex h-40 flex-col w-full items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input type="file" onChange={handleFileChange} />
        <button
          className="bg-zinc-700 rounded-xl hover:bg-zinc-500 w-fit p-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
