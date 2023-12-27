import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    //destructuring of request
    const { email: email, password: password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User does not exist",
      });
    }

    //check if password is correct
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return NextResponse.json({
        status: 401,
        message: "Invalid credentials",
      });
    }

    //generate tokenData
    const tokenData = {
      id: user._id,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      status: 200,
      message: "User logged in successfully",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,

      path: "/",
    });
    
    return response;


  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: error.message,
    });
  }
};
export const GET = () => {
  return NextResponse.json({ status: 405, message: "Invalid Request" });
};
