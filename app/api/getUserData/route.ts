import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  connectDB();
  try {
    const userId = await getTokenData(request);

    const userData = await User.findById(userId).select("-password");

    return NextResponse.json({ userData, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error, status: 500 });
  }
};
