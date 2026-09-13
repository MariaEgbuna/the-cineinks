import { NextResponse } from "next/server";
import { SITE_URL } from "../../../utils/site";

export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const redirectUri = `${SITE_URL}/api/callback`;

  const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=repo`;

  return NextResponse.redirect(authorizeUrl);
}