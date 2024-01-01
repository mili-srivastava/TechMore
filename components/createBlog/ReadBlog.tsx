"use client"
import { fetchBlogData } from "@/actions/blog.action";
import { blogModules, formats } from "@/constants";
import { blogData } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
const DynamicReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReadBlog = ({ _id }: blogData) => {
  const [blogData, setBlogData] = useState<blogData>({
    title: "",
    description: "",
    content: "",
    thumbnail: "",
  });

useEffect(() => {
    const getBlogData = async () => {
        const response = await fetchBlogData(_id);
        console.log(response);

        if (response) {
            setBlogData(response);
        }
    };

    getBlogData();
}, [_id, setBlogData]);

  return (
    <div className="md:ml-16 mx-auto ">
        <Image src={blogData.thumbnail || ""} width={500} height={500} alt="blog Thumbnail" className="w-full h-64 mt-16 pb-10" />
      <p className="text-center text-4xl">{blogData.title}</p>
      <p className="text-gray-600 text-lg dark:text-gray-400 text-center my-5">
        {blogData.description}
      </p>
      <div className="my-5 mx-5">
      <DynamicReactQuill
          theme="snow"
          value={blogData.content}
          readOnly={true}
          modules={blogModules}
          formats={formats}
          className="max-w-5xl mx-auto "
        />
      </div>
    </div>
  );
};

export default ReadBlog;
