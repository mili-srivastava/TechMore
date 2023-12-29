"use client";

import { userData } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiMiniPhoto } from "react-icons/hi2";
import { TbPhotoEdit } from "react-icons/tb";
import { IoTrash } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { fetchUserData } from "@/actions/user.action";

const EditProfile = () => {
  const [userData, setUserData] = useState<userData>({
    name: "",
    username: "",
    profilePicUrl: "",
    bio: "",
  });
  const [modal, showModal] = useState(false);
  const [image , setImage] = useState(false)
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  

  const openModal = () => {
    showModal(true);
  };

  const closeModal = () => {
    showModal(false);
  };

  const handleImage = () => {
    closeModal()
    setImage(!image)
  }

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

  const handleInput = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      username: username,
      bio: bio,
      profilePicUrl: selectedImage,
    };

    try {
      const response = await axios.post("/api/editProfile", data);
      console.log(response.data);
      if (response.data.status === 201) {
        toast.success("Profile Updated Successfully");
        window.location.reload();
      } else if (response.data.status === 400) {
        toast.error("Can't Update Profile try again later");
      } else if (response.data.status === 500) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      <Image
        src={
          selectedImage ? selectedImage : userData?.profilePicUrl || "/user.png"
        }
        width={500}
        height={500}
        alt="profile"
        className="h-36 w-36 rounded-full mx-auto border-2 border-gray-500"
      />

      <button
        onClick={openModal}
        className="block text-white mx-auto mt-5 bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        Edit Photo
      </button>

      <div className={image? `md:w-[35vw] w-[90vw] h-[90vw] md:h-[35vw]  rounded-lg bg-purple-950 mx-auto relative -mt-52`: `hidden`}>
        <RxCross2 className="text-3xl text-gray-300 absolute top-0 right-0 m-4 cursor-pointer"
        onClick={handleImage} />
        <Image
          src={userData?.profilePicUrl || ""}
          width={500}
          height={500}
          alt="profile"
          className="md:w-[30vw] md:h-[30vw] w-[85vw] h-[75vw] rounded-lg mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-5 "
        />
      </div>

      <div className="w-full md:px-10 grid gap-5 px-8 md:pl-28 ">
        <div className="grid gap-2 ">
          <label className="text-xl font-bold"> Name</label>

          <input
            type="text"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3"
            defaultValue={userData?.name}
            name="title"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Username</label>
          <input
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3 "
            defaultValue={userData?.username}
            name="description"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Bio</label>
          <textarea
            className="h-28 shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3 "
            defaultValue={userData?.bio}
            name="description"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>
      <div className="mx-auto w-fit py-10">
        <button
          className="bg-green-500 text-white rounded-md px-5 py-2"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
        <button
          className="bg-red-500 text-white rounded-md px-10 py-2 mx-5"
          
        >
          Discard
        </button>
      </div>

      <div>
        <div
          id="default-modal"
          aria-hidden="true"
          className={
            modal
              ? `overflow-y-auto overflow-x-hidden md:mx-56 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`
              : `hidden`
          }
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Profile Picture
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <button className="flex cursor-pointer items-center gap-2 text-xl dark:text-gray-400"
                onClick={handleImage}>
                  <HiMiniPhoto className="text-blue-500" />
                  View Profile Picture
                </button>
                <label
                  htmlFor="profile"
                  className="flex cursor-pointer items-center gap-2 text-xl dark:text-gray-400"
                >
                  <TbPhotoEdit className="text-yellow-500" />
                  Edit Profile Picture
                </label>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="hidden"
                  accept="image/*"
                  onChange={handleInput}
                />
                <button className="flex cursor-pointer items-center gap-2 text-xl dark:text-gray-400">
                  <IoTrash className="text-red-500" />
                  Remove Profile Picture
                </button>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  onClick={closeModal}
                  className="text-white bg-green-600 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Save Changes
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  onClick={closeModal}
                  className="ms-3  bg-red-600 hover:bg-red-700  rounded-lg text-white text-sm font-medium px-5 py-2.5 focus:z-10 dark:text-gray-300 "
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
