"use client";
import Profilepicture from "./Profilepicture";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Signupform = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //check if all fields are filled
    if (name === "" || username === "" || email === "" || password === "") {
      return;
    }

    //check if it is a valid email

    const emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (!emailregex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
      profilePicUrl: selectedImage,
      bio: bio,
    };

    try {
      const response = await axios.post("/api/signup", data);
      console.log(response.data);
      if (response.data.status === 201) {
        toast.success("Account Created Successfully");
        router.push("/login");
      } else if (response.data.status === 400) {
        toast.error("User Already Exists");
      } else if (response.data.status === 500) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <div className="min-h-screen  flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-12"
          src="/logo.svg"
          alt="Workflow"
          width={500}
          height={500}
        />
        <h2 className="mt-3 text-center text-3xl leading-9 font-extrabold text-gray-900 dark:text-white">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          Or
          <Link
            href="/login"
            className="font-medium px-2 text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            login to your account
          </Link>
        </p>
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
      </div>

      <div className="mt-28 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form method="POST" action="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5  text-gray-500"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-transparent appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <div className=" absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-gray-500"
              >
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="john"
                  type="text"
                  required
                  className="bg-transparent appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5  text-gray-500"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  type="email"
                  required
                  className="bg-transparent appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
                "
                />
                <div className=" absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-500"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••"
                  className="bg-transparent appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="Bio"
                className="block text-sm font-medium leading-5 text-gray-500"
              >
                Enter your Bio
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <textarea
                  id="bio"
                  name="bio"
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="What do you do?"
                  className="bg-transparent appearance-none block w-full px-3 h-28 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex justify-center py-2 px-4 border border-transparent  font-medium rounded-md text-white bg-green-600  focus:outline-nonetransition duration-150 ease-in-out"
                >
                  Create account
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signupform;
