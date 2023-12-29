"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Loginform = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //check if all fields are filled
    if (email === "" || password === "") {
      toast.error("Please fill all the fields");

      return;
    }

    //check if it is a valid email

    const emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (!emailregex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    const data = {
      email: email,
      password: password,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/login",
        data
      );
      console.log(response.data);
      if (response.data.status === 200) {
        toast.success("Login Successfull");
        console.log(response.data.message);
        router.push("/");
      } 
      else if (response.data.status === 401) {
        toast.error("Invalid Credentials");
      } 
      else if (response.data.status === 400) {
        toast.error("User Not Found");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className=" pt-5">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-4xl font-bold dark:text-white text-purple-900"
          >
            <Image
              className="w-10 h-10 mr-2 lg:w-12 lg:h-12"
              src="/logo.svg"
              alt="logo"
              width={500}
              height={500}
            />
            TechMore
          </Link>
          <div className="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-transparent ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
                Welcome Again!
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                  <Link
                    href="/"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className=" text-white bg-green-600 px-5 py-2 w-full justify-center font-medium text-lg flex rounded-lg"
                >
                  Login
                </button>
                <p className="pl-2 text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Loginform;
