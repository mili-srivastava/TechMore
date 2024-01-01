import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPath = path === "/login" || path === "/signup" || path==="/" ||  path==="/welcome";

  const token = request.cookies.get("token")?.value || "";

  if (publicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup" , "/welcome"],
};
