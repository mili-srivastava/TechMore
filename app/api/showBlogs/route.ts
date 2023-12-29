import Blog from "@/models/Blog";
import connectDB from "@/utils/db"
import { NextResponse } from "next/server";



export const GET = async () =>{
    connectDB();

    try {

        const blogs = await Blog.find({});

        return NextResponse.json({
            status: 200,
            message: "Blogs fetched successfully",
            blogs,
        });
        
    } 
    
    catch (error:any) {

        return NextResponse.json({
            status: 500,
            message: error.message
        })
        
    }
}