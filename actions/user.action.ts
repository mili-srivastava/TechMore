"use server";

import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/User";
import connectDB from "@/utils/db";

export const fetchUserData = async () => {
  connectDB();

  const userId:string = await getTokenData();

  const userData = await User.findById(userId).select("-password");

  return userData;
};
