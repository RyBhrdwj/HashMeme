import React, { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  return (
    <div>
      <form className="flex h-40 flex-col w-full items-center justify-center" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button className="bg-zinc-700 rounded-xl hover:bg-zinc-500 w-fit p-2" type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
