"use client";

import Image from "next/image";

import { IoMenu } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { MdOutlineWbSunny, MdSettingsSuggest } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { userData } from "@/types";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFeed } from "react-icons/md";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { set } from "mongoose";
import { fetchUserData } from "@/actions/user.action";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState<userData>({
    name: "",
    username: "",
    profilePicUrl: "",
  });

  const router = useRouter();

  const Openmenu = () => {
    setMenu(true);
  };
  const Closemenu = () => {
    setMenu(false);
  };

  const Opensearch = () => {
    setSearch(true);
  };
  const Closesearch = () => {
    setSearch(false);
  };

  const fetchData = async () => {
    const response = await fetchUserData();
    console.log(response);
    if (response) {
      setLogin(true);
      setUserData(response);
      
    }
    setUserData(response);
  };

  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  if (!mounted) {
    return null;
  }

  const logOut = async () => {
    try {
      const res = await axios.get("/api/logOut");
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setLogin(false);
        setUserData({
          name: "",
          username: "",
          profilePicUrl: "",
        });
        Closemenu();
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <div
        className={
          search
            ? `hidden`
            : `px-5 fixed w-full py-3 flex justify-between items-center dark:bg-[#060811] border-b border-gray-800 bg-purple-200 z-30`
        }
      >
        <div className="flex gap-3 items-center">
          <IoMenu
            className="text-3xl cursor-pointer md:hidden"
            onClick={Openmenu}
          />
          <IoIosArrowDroprightCircle
            className={
              menu
                ? `hidden`
                : `text-4xl md:flex hidden cursor-pointer absolute top-20 z-50 left-10`
            }
            onClick={Openmenu}
          />

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              width={500}
              height={500}
              alt="logo"
              className="w-10 h-10"
            />
            <h1 className="text font-bold text-3xl sm:flex hidden">TechMore</h1>
          </Link>
        </div>
        <div className="flex gap-7 items-center ">
          <Link
            href="/createBlogs"
            className="bg-purple-700 p-2 rounded-full md:px-8 md:py-2  "
          >
            <LuPencilLine className="bg-purple-700  cursor-pointer text-white text-2xl" />
          </Link>
          <BsSearch
            className="text-2xl text-gray-600 cursor-pointer dark:text-white"
            onClick={Opensearch}
          />
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
              <MdOutlineWbSunny className="text-2xl text-gray-600 cursor-pointer dark:text-white" />
            ) : (
              <IoMoonOutline className="text-2xl text-gray-600 cursor-pointer dark:text-white " />
            )}
          </button>
        </div>
      </div>
      <div className={search ? `py-3 px-2` : `hidden`}>
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className=" w-full  p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search Blogs, Accounts..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-purple-800 px-4 py-2 rounded-lg text-sm dark:bg-purple-700 mr-10"
            >
              Search
            </button>
            <RxCross2
              className="text-3xl absolute end-2.5 top-2.5 cursor-pointer"
              onClick={Closesearch}
            />
          </div>
        </form>
      </div>
      <div className="flex w-[100%]">
        <div
          className={
            menu
              ? `w-[70%] md:w-[35%] lg:w-[25%] h-screen z-40 dark:bg-[#070a1a] bg-white  shadow-2xl light:shadow-gray-900 absolute top-0 px-5 pt-2`
              : `hidden`
          }
        >
          <RxCross2
            className="text-3xl float-end cursor-pointer"
            onClick={Closemenu}
          />

          <Image
            className="w-28 h-28 rounded-full mx-auto mt-10 border-2 border-gray-700 "
            src={userData?.profilePicUrl || "/user.png"}
            alt=""
            width={500}
            height={500}
          />

          <div className="text-center">
            <h1 className="text-center mt-5">{userData?.name}</h1>

            <p className="text-gray-500 text-center">
              {userData?.username || ""}
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-2 mx-4">
            <Link
              href="/"
              onClick={Closemenu}
              className="text-center hover:bg-slate-400 flex items-center gap-2 px-5 py-2 rounded-xl font-medium text-sm"
            >
              {" "}
              <MdOutlineFeed className="text-2xl" />
              My Feed
            </Link>
            <Link
              href={`/profile/${userData?.username}`}
              onClick={Closemenu}
              className="text-center flex items-center gap-2 hover:bg-slate-400 px-5 py-2 rounded-xl font-medium text-sm"
            >
              {" "}
              <CgProfile className="text-2xl" />
              My Profile
            </Link>
            <Link
              href="/"
              onClick={Closemenu}
              className="text-center flex items-center gap-2 hover:bg-slate-400 px-5 py-2 rounded-xl font-medium text-sm"
            >
              {" "}
              <MdSettingsSuggest className="text-2xl" />
              Account Details
            </Link>
            <Link
              href={login ? "" : "/login"}
              className={
                login
                  ? `mt-5 text-center text-red-600 border-2 border-red-600 hover:bg-red-500 hover:text-white font-bold shadow-red-300 shadow px-5 py-2 rounded-xl`
                  : `mt-5 text-center text-green-600 border-2 border-green-600 hover:bg-green-500 hover:text-white font-bold shadow-green-300 shadow px-5 py-2 rounded-xl`
              }
            >
              {login ? <p onClick={logOut}>Logout</p> : "Login"}
            </Link>
          </div>
        </div>
        <div
          className={
            menu
              ? `dark:bg-[#020617] md:hidden bg-white h-screen w-[60%] absolute top-0 right-0 blur-sm`
              : search
              ? "hidden"
              : `w-[5%] hidden md:flex z-20 dark:bg-[#060811] bg-purple-200 h-screen fixed top-[65px] left-0 shadow-xl shadow-purple-600`
          }
          onClick={Closemenu}
        ></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
