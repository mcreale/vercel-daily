import { getBreakingNews } from "@/lib/data";

export async function GET() {
  try {
    const data = await getBreakingNews();
    return Response.json(data);
  } catch {
    return Response.json(
      { message: "Failed to fetch breaking news" },
      { status: 502 },
    );
  }
}
