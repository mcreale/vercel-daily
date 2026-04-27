import { isSubscribed, subscribe, unsubscribe } from "@/lib/subscription";

export async function GET() {
  const subscribed = await isSubscribed();
  return new Response(JSON.stringify({ subscribed }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST() {
   
  let message = "Subscribed successfully";
  
  if (await isSubscribed()) {
    message = "Already subscribed";
  } else {
    await subscribe();
  }
  
  return new Response(JSON.stringify({ subscribed:true, message }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

}
  
export async function DELETE() {
  await unsubscribe();
  return new Response(JSON.stringify({ subscribed:false, message: "Unsubscribed successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}