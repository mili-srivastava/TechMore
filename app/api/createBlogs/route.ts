import { getTokenData } from "@/helpers/getTokenData";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (request:NextRequest) => {
try {

    const reqBody = await request.json();

    //destructuring of request
    const {
        title: title,
        description: description,
        content: content,
        thumbnail: thumbnail,
        author: author,
    
} = reqBody;

const userId = await getTokenData();

if (!userId) {
    return NextResponse.json({
        status: 401,
        message: "You are not authenticated",
    });
}

//create new blog
const newBlog = new Blog({
    title: title,
    description: description,
    content: content,
    thumbnail: thumbnail,
    author: author,

});

//save blog
await newBlog.save();

return NextResponse.json({
    status: 200,
    message: "Blog created successfully",
    newBlog,
});

}

catch (error: any) {

    return NextResponse.json({
        status: 500,
        message: error.message,
    });
    
}
}
