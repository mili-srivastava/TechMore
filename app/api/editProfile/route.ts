import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  connectDB();
  try {
    const reqBody = await request.json();

    //destructuring of request
    const {
      name: name,
      username: username,
      profilePicUrl: profilePicUrl,
      bio: bio,
    } = reqBody;



    const userId = await getTokenData();

    const userData = await User.findById(userId).select("-password");
    userData.name = name;
    userData.username = username;
    userData.profilePicUrl = profilePicUrl;
    userData.bio = bio;

    await userData.save();

    return NextResponse.json({
      status: 201,
      message: "User updated successfully",
      userData,
    });

  } catch (error: any) {
    return NextResponse.json({ error, status: 500 });
  }
};
