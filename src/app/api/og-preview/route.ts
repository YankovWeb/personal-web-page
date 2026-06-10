import { NextResponse } from "next/server";
import { fetchOgPreview, isPublicHttpUrl } from "@/lib/og-preview";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter." }, { status: 400 });
  }

  if (!isPublicHttpUrl(url)) {
    return NextResponse.json(
      { error: "Enter a valid public http(s) URL." },
      { status: 400 },
    );
  }

  try {
    const preview = await fetchOgPreview(url);
    return NextResponse.json(preview);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load share preview.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
