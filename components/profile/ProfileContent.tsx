"use client";

import Image from "next/image";
import { userData } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { fetchDataByUsername, } from "@/actions/user.action";

const ProfileContent = ({username}: userData) => {
  const [userData, setUserData] = useState<userData>({
    name: "",
    username: "",
    profilePicUrl: "",
    bio: "",
  });
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

    const getuserDetails = async () =>{
      const res = await fetchDataByUsername(username);
      console.log(username)
      console.log(res);
      setUserData(res);
    }

    useEffect(() => {
      getuserDetails();
    }, []);



  const shareUrl =
    `https://techmore-orcin.vercel.app/profile/${userData?.username}` ||
    `localhost:3000/profile/${userData?.username}`;

  return (
    <div className="flex flex-col">
      <div className="h-44 md:h-44 bg-gradient">
        <p className="text-3xl justify-end flex py-2 px-5 gap-2">
          <span>0</span> Blogs
        </p>
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
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-500">
            {userData?.username}
          </p>
          <p className="w-64 mx-auto mt-3">{userData?.bio}</p>
          <div className="">
            <Link
              href="/editProfile"
              className="bg-pink-700 px-5 py-3 rounded-full font-medium mt-5 "
            >
              Edit Profile
            </Link>
            <button
              className="bg-purple-700 mx-5 px-5 py-2 rounded-full font-medium mt-5 "
              onClick={handleModal}
            >
              Share Profile
            </button>
          </div>
        </div>
        <div
          className={
            modal
              ? ` absolute inset-0 flex items-center justify-center  `
              : `hidden`
          }
        >
          <div className="bg-gray-100 dark:bg-purple-950 w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items center border-b border-gray-200 py-3">
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  Share Your profile
                </p>
              </div>

              <div
                className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
                onClick={handleModal}
              >
                x
              </div>
            </div>

            <div className="flex gap-7 my-5">
              <div>
                <LinkedinShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
              <div>
                <FacebookShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div>
                <WhatsappShareButton
                  url={shareUrl}
                  title={"title"}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              <div>
                <TelegramShareButton
                  url={shareUrl}
                  title={"title"}
                  className="Demo__some-network__share-button"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
            </div>

            <div className="my-4">
              <p className="text-sm">Share this link via</p>

              <p className="text-sm">Or copy link</p>

              <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-gray-500 ml-2"
                >
                  <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                  <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                </svg>

                <input
                  className="w-full outline-none bg-transparent"
                  type="text"
                  placeholder="link"
                  value="https://boxicons.com/?query=link"
                />

                <button className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
