
import jwt from "jsonwebtoken";
import {cookies} from "next/headers" 

export const getTokenData = async () => {
  try {

    const token = cookies().get("token")?.value || "";

    if (!token) {
      return null;
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    const tokenId = decodedToken.id;

    return tokenId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

