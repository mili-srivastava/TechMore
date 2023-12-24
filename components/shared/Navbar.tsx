"use client";

import Image from "next/image";

import { IoMenu } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDroprightCircle } from "react-icons/io";


const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const Openmenu = () => {
    setMenu(true);
  };
  const Closemenu = () => {
    setMenu(false);
  };

  const Opensearch = () => {
    setSearch(true);
  }
  const Closesearch = () => {
    setSearch(false);
  }

  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className={search? `hidden` :`px-5 py-3 flex justify-between items-center dark:bg-[#060811] border-b border-gray-800 bg-purple-200`}>
        <div className="flex gap-3 items-center">
          <IoMenu className="text-3xl cursor-pointer md:hidden" onClick={Openmenu} />
          <IoIosArrowDroprightCircle className={menu? `hidden` : `text-4xl md:flex hidden cursor-pointer absolute top-20 z-50 left-10`} onClick={Openmenu} />

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
        <div className="flex gap-7 items-center">
          <LuPencilLine className="text-purple-900 text-2xl cursor-pointer dark:text-white" />
          <BsSearch className="text-2xl text-gray-600 cursor-pointer dark:text-white" onClick={Opensearch} />
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
              <MdOutlineWbSunny className="text-2xl text-gray-600 cursor-pointer dark:text-white" />
            ) : (
              <IoMoonOutline className="text-2xl text-gray-600 cursor-pointer dark:text-white " />
            )}
          </button>
        </div>
      </div>
      <div className={search? `py-3 px-2` : `hidden`}>
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
        <RxCross2 className="text-3xl absolute end-2.5 top-2.5 cursor-pointer" onClick={Closesearch} />
        
      </div>
    </form>
      </div>
      <div className="flex w-[100%]">
        <div
          className={
            menu
              ? `w-[60%] md:w-[25%] h-screen dark:bg-[#070a1a] bg-white  shadow-2xl light:shadow-gray-900 absolute top-0 px-5 pt-2`
              : `hidden`
          }
        >
          <RxCross2
            className="text-3xl float-end cursor-pointer"
            onClick={Closemenu}
          />
          <Image
            className="w-28 h-28 rounded-full mx-auto mt-10 border-2 border-gray-700 "
            src="/user.png"
            alt=""
            width={500}
            height={500}
          />
          <div className="text-center">
            <h1 className="text-center mt-5">Mili Srivastava</h1>
            <p className="text-gray-500 text-center">@milii__</p>
          </div>
          <div className="mt-12 flex flex-col gap-2 mx-4">
            <h1 className="text-center hover:bg-slate-500 px-5 py-2 rounded-xl font-semibold">
              My Feed
            </h1>
            <h1 className="text-center hover:bg-slate-500 px-5 py-2 rounded-xl font-semibold">
              Profile
            </h1>
            <h1 className="mt-5 text-center text-red-600 border-2 border-red-600 hover:bg-red-500 hover:text-white font-bold shadow-red-300 shadow px-5 py-2 rounded-xl">
              Logout
            </h1>
          </div>
        </div>
        <div
          className={
            menu
              ? `dark:bg-[#020617] md:hidden bg-white h-screen w-[40%] absolute top-0 right-0 blur-sm`
              : search?'hidden': `w-[5%] hidden md:flex dark:bg-[#060811] bg-purple-200 h-screen absolute top-[65px] left-0 shadow-xl shadow-purple-600`
          }
          onClick={Closemenu}
        ></div>
      </div>
      
    </div>
  );
};

export default Navbar;
