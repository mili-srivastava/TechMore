
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import User from "@/models/User";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    //destructuring of request
    const {
      name: name,
      email: email,
      username: username,
      password: password,
    } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json({
        status: 400,
        message: "User already exists",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      name: name,
      email: email,
      username: username,
      password: hashedPassword,
    });

    //save user
    await newUser.save();

    return NextResponse.json({
      status: "201",
      message: "User created successfully",
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "500",
      message: error.message,
    });
  }
};

export const GET = () => {
  return NextResponse.json({ status: 405, message: "Invalid Request" });
};
