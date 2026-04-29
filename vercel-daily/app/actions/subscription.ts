'use server'

import { isSubscribed, subscribe, unsubscribe } from "@/lib/subscription";

type SubscriptionResponse = {
  subscribed: boolean;
  message?: string;
};

export async function getSubscriptionStatus(): Promise<SubscriptionResponse> {
  const subscribed = await isSubscribed();
  return { subscribed };

}

export async function subscribeUser(): Promise<SubscriptionResponse> {
  let message = "Subscribed successfully";

  if (await isSubscribed()) {
    message = "Already subscribed";
  } else {
    await subscribe();
  }
  return { subscribed: true, message };
}
  
export async function unsubscribeUser(): Promise<SubscriptionResponse> {
  await unsubscribe();
  return { subscribed: false, message: "Unsubscribed successfully" };
}
