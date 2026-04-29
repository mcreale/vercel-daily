import { NextRequest, NextResponse } from "next/server";
import { isSubscribed } from "./lib/subscription";

export function proxy(request: NextRequest) {
  // check to see if the user is subscribed and if not, send them to the paywalled article
    
  const pathname = request.nextUrl.pathname;

  // Check if the path contains /articles/ pattern (but not paywall)
  const articlesMatch = pathname.match(/\/articles\/([^/]+)(?!\/paywalled)$/);

  if (!articlesMatch || !articlesMatch[1]) {
    return NextResponse.next();
  }

  const subscriptionCookie = request.cookies.get("subscription_token")?.value;
  
  if (!subscriptionCookie) {
    const slug = articlesMatch[1];
    const paywalledUrl = new URL(`/articles/${slug}/paywalled`, request.url);
    return NextResponse.rewrite(paywalledUrl);
  }else{
    return NextResponse.next();
  }
}