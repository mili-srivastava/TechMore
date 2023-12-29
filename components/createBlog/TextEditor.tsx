"use client";
import { formats, modules } from "@/constants";
import dynamic from "next/dynamic";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserData } from "@/actions/user.action";
import { userData } from "@/types";
import { useRouter } from "next/navigation";
const DynamicReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogData, setBlogData] = useState("");
  const [userData, setUserData] = useState<userData>({
    _id: "",
  });


  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  const router = useRouter();

  const handleInput = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedThumbnail(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleBlogChange = (event: any) => {
    setValue(event);
    setBlogData(event);
  };

  const fetchData = async () => {
   
    const response = await fetchUserData();
    console.log(response)
    if (response) {
      setUserData(response);
    }
   
};

useEffect(() => {
  fetchData();
}, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      content: blogData,
      thumbnail: selectedThumbnail,
      author: userData._id,
    };

    if (!title || !description || !blogData || !selectedThumbnail) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post("/api/createBlogs", data);
      console.log(response.data)

      if (response.data.status === 200) {
        toast.success("Blog Created Successfully");
        router.push("/");
      }

      if (response.data.status === 401) {
        toast.error("You are not authorized to create blog");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="md:ml-16 my-5 mx-5 md:mx-0 mt-20 ">
      <div className="w-full md:px-10 grid gap-5 ">
        <div className="grid gap-2">
          <label className="text-xl font-bold">Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleInput}
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border-gray-800 dark:border-gray-500 border-2 w-full rounded-md p-2"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Enter Your Title</label>

          <input
            type="text"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3"
            placeholder="Enter Your Title"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Enter Your Description</label>
          <input
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-5 "
            placeholder="Enter Your description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </div>
      </div>
      <div className="mt-5 md:mx-10">
        <DynamicReactQuill
          theme="snow"
          value={value}
          onChange={handleBlogChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
          className="max-w-5xl mx-auto h-screen "
        />
      </div>

      <div className="my-20 pb-20">
        <button
          className="bg-green-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-full mx-auto flex"
          onClick={handleSubmit}
        >
          Submit Blog
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default TextEditor;
