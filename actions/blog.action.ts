"use server"

import Blog from "@/models/Blog";
import connectDB from "@/utils/db"

export const fetchBlogData = async(_id: string | undefined) => {
    connectDB();
    const data = await Blog.findById(_id);
    return data;

}