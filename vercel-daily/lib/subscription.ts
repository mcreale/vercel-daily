'use server';

import { cookies } from "next/headers";
export async function isSubscribed(): Promise<boolean> {
  console.log("Checking subscription status...");
  const cookieStore = await cookies();
  const subscribed = cookieStore.get("subscribed")?.value === "true";
  console.log("Subscription status:", subscribed);
  return subscribed;
}

export async function subscribe(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("subscribed", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}

export async function unsubscribe(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("subscribed");
}
