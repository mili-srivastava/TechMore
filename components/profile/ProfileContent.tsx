"use client";

import Image from "next/image";
import axios from "axios";
import { userData } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProfileContent = () => {
  const [userData, setUserData] = useState<userData>({
    name: "",
    username: "",
    profilePicUrl: "",
    bio: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getUserData");
      console.log(response.data.userData);
      setUserData(response.data.userData);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="h-36 md:h-32 bg-gradient">
        <p className="text-3xl justify-end flex py-2 px-5 gap-2"><span>0</span> Blogs</p>
      </div>
      <div>
        <Image
          src={userData?.profilePicUrl || "/user.png"}
          alt="Profile Pic"
          className="rounded-full w-32 h-32 md:h-36 md:w-36 -mt-20 mx-auto"
          width={500}
          height={500}
        />

      <div className="text-center mt-3">
       <p className="text-3xl md:text-4xl">{userData?.name}</p>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-500">{userData?.username}</p>
        <p className="w-64 mx-auto mt-3">{userData?.bio}</p>
        <div className="">
        <Link href="/editProfile" className="bg-pink-700 px-5 py-2 rounded-full font-medium mt-5 ">Edit Profile</Link>
        <button className="bg-purple-700 mx-5 px-5 py-2 rounded-full font-medium mt-5 ">Share Profile</button>
        </div>
       </div>
      </div>
    </div>
  );
};

export default ProfileContent;
