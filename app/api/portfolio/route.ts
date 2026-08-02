import { NextRequest, NextResponse } from "next/server";
import { getPortfolioByUserId, savePortfolioData, UserProfileData } from "@/lib/portfolioStore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user") || searchParams.get("username") || searchParams.get("email") || "default";

    const portfolio = await getPortfolioByUserId(userId);
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio data", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: UserProfileData = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body payload" }, { status: 400 });
    }

    const saved = await savePortfolioData(body);
    return NextResponse.json(saved, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save portfolio data", details: (error as Error).message },
      { status: 500 }
    );
  }
}
