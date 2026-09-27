import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  if (!token.role && !pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding/role", req.url));
  }

  if (token.role && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/onboarding/:path*"],
};
