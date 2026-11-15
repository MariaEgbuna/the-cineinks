import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { SITE_URL } from "../../../utils/site";

export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const redirectUri = `${SITE_URL}/api/callback`;
  const state = randomBytes(16).toString("hex");

  const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=public_repo&state=${state}`;

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/api",
  });
  return response;
}