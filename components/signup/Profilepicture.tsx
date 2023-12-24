"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

const ProfilePicture = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleInput = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }

    e.preventDefault();
    const data = {
      selectedImage: selectedImage,
    };

    try {
      const response = axios.post("/api/profilePic", data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-64 relative mt-5 cursor-pointer">
      <div className="w-36 h-36 rounded-full absolute left-1/2 transform -translate-x-1/2 bg-gray-200">
        {selectedImage && (
          <Image
            className="w-full h-full rounded-full"
            src={selectedImage}
            alt=""
            width={500}
            height={500}
          />
        )}
      </div>
      <div className="w-36 h-36 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500 left-1/2 transform -translate-x-1/2">
        <label htmlFor="profile">
          <Image
            className="hidden group-hover:block w-12 cursor-pointer"
            src="https://www.svgrepo.com/show/33565/upload.svg"
            alt=""
            width={500}
            height={500}
          />
        </label>
        <input
          type="file"
          id="profile"
          accept="image/*"
          onChange={handleInput}
          hidden
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
