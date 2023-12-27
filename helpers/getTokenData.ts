import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || " ";

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    const tokenId = decodedToken.id;

    return tokenId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
