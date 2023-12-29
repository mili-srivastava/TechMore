"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { blogData } from "@/types";

const Blog = () => {
  const [blogs, setBlogs] = useState<blogData[]>([{
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    author: "",
  }]
    
);

  const getBlogs = async () => {
    const res = await axios.get("/api/showBlogs");
    if(res.data.blogs)
    console.log(res.data.blogs);
    setBlogs(res.data.blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {
        blogs.map((blog: blogData) => (
          <div key={blog._id} className="max-w-80 shadow-lg shadow-purple-950 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
        <Link href="#">
          <Image
            className="rounded-t-lg h-40 object-cover w-full"
            src={blog.thumbnail || ""}
            alt=""
            width={500}
            height={500}
          />
        </Link>
        <div className="p-5">
          <Link href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blog.title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {blog.description}
          </p>
          <Link
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
         
        ))
      }
      
      
    </div>
  );
};

export default Blog;
