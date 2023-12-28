import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      status: 200,
      message: "Logged out successfully",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};
