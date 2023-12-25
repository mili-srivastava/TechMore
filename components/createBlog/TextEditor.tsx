"use client";
import { formats, modules } from "@/constants";
import dynamic from "next/dynamic";

import React, { useState } from "react";

import "react-quill/dist/quill.snow.css";
const DynamicReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const [value, setValue] = useState("");

  return (
    <div className="md:ml-16 my-5 mx-5 md:mx-0 mt-20 ">
      <div className="w-full md:px-10 grid gap-5 ">
        <div className="grid gap-2">
          <label className="text-xl font-bold">Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border-gray-800 dark:border-gray-500 border-2 w-full rounded-md p-2"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Enter Your Title</label>

          <input
            type="text"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3"
            placeholder="Enter Your Title"
            name="title"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Enter Your Description</label>
          <input
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-5 "
            placeholder="Enter Your description"
            name="description"
          />
        </div>
      </div>
      <div className="mt-5 md:mx-10 pb-28">
        <DynamicReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
          className="max-w-5xl mx-auto h-screen "
        />
      </div>
    </div>
  );
};

export default TextEditor;
