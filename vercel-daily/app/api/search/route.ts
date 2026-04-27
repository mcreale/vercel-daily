import { searchArticles } from "@/lib/data";

export async function GET(request: Request) {
  const {searchParams}= new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const articles = await searchArticles(q);
  return new Response(JSON.stringify( articles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}