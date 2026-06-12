import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth is bypassed for local development preview.
// Re-enable Clerk by uncommenting the clerkMiddleware block
// once NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set in .env.local
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
