import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.includes(".")) {
    console.log("middleware");
    return NextResponse.next();
  }
}

// matcherで指定したパスに対してmiddlewareを実行する
export const config = {
  matcher: ["/blog/:path*"],
};
