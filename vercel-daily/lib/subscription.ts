'use server';

import { cookies } from "next/headers";
import { deactivateSubscription, getSubscriptionStatus, upsertSubscription } from "./data";

async function getTokenFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const subscriptionToken = cookieStore.get("subscription_token")?.value || undefined;
  return subscriptionToken;
}

export async function isSubscribed(): Promise<boolean> {
  
  const subscriptionToken = await getTokenFromCookies();
  
  if (!subscriptionToken) {
    return false;
  }
  try{
    const subscriptionStatus = await getSubscriptionStatus(subscriptionToken);
    console.log("Subscription status:", subscriptionStatus);
    return subscriptionStatus.status === "active";  
  }
  catch(error){
    console.error("Error checking subscription status:", error);
    if (error instanceof Error && error.message === "Subscription token not found") {
      // If fetching subscription status fails, we can assume the token is invalid and remove it from cookies
      const cookieStore = await cookies();
      cookieStore.delete("subscription_token");
    }
    return false;
  }
  
  
}

export async function subscribe(): Promise<void> {
  const subscriptionToken = await getTokenFromCookies();  

  const subscriptionSTatus = await upsertSubscription(subscriptionToken);
  
  // Set the subscription token cookie if it's not already set
  if (!subscriptionToken) {
    const cookieStore = await cookies();

    cookieStore.set("subscription_token", subscriptionSTatus.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }
}

export async function unsubscribe(): Promise<void> {
  const subscriptionToken = await getTokenFromCookies();
  if (!subscriptionToken) {
    return;
  }
  await deactivateSubscription(subscriptionToken);
  
}
