"use server";

import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/User";
import connectDB from "@/utils/db";

let userId: string;

export const fetchUserData = async () => {
  connectDB();

   userId = await getTokenData();

  const userData = await User.findById(userId).select("-password");

  return userData;
};

export const fetchDataByUsername = async (username: string | undefined) => {
  connectDB();

  const userData = await User.findOne({ username}).select("-password");

  return userData;
};


export const removeProfilePicture = async () => {
  await connectDB();

  const user = await User.findById(userId);
  user.profilePicUrl = "";
  await user.save();
};
