import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "../../../utils/site";

function popupResponse(message: string, clearCookie = true) {
  const allowedOrigin = new URL(SITE_URL).origin;
  // JSON.stringify makes the values safe to place inside a script; the
  // replace() stops "<" from breaking out of the script tag.
  const safe = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");

  const html = `
    <script>
      (function() {
        var allowedOrigin = ${safe(allowedOrigin)};
        function receiveMessage(e) {
          if (e.origin !== allowedOrigin) return;
          window.opener.postMessage(${safe(message)}, e.origin);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", allowedOrigin);
      })();
    </script>
  `;

  const response = new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
  if (clearCookie) response.cookies.delete("oauth_state");
  return response;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("oauth_state")?.value;

  if (!code || !state || state !== savedState) {
    return new NextResponse("Invalid login request. Please try again.", {
      status: 400,
    });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return popupResponse(
      "authorization:github:error:" +
        JSON.stringify({ message: tokenData.error_description ?? "Login failed" })
    );
  }

  return popupResponse(
    "authorization:github:success:" +
      JSON.stringify({ token: tokenData.access_token, provider: "github" })
  );
}