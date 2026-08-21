const dashboardOrigin = (
  process.env.DASHBOARD_ORIGIN ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://harmony-medspa-dashboard.vercel.app")
).replace(/\/$/, "");

const responseHeadersToSkip = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "set-cookie",
  "transfer-encoding",
]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const requestOrigin = request.headers.get("origin");

  if (requestOrigin && requestOrigin !== requestUrl.origin) {
    return Response.json({ error: "Invalid sign-in request." }, { status: 403 });
  }

  const upstreamUrl = new URL("/api/auth/login", dashboardOrigin);
  const upstreamHeaders = new Headers();

  for (const name of ["accept", "content-type", "cookie", "user-agent"]) {
    const value = request.headers.get(name);
    if (value) upstreamHeaders.set(name, value);
  }

  upstreamHeaders.set("origin", upstreamUrl.origin);

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = new Headers();
    upstreamResponse.headers.forEach((value, name) => {
      if (!responseHeadersToSkip.has(name.toLowerCase())) {
        responseHeaders.append(name, value);
      }
    });

    const upstreamHeadersWithCookies = upstreamResponse.headers as Headers & {
      getSetCookie?: () => string[];
    };
    const cookies = upstreamHeadersWithCookies.getSetCookie?.() ?? [];
    for (const cookie of cookies) {
      responseHeaders.append("set-cookie", cookie);
    }

    responseHeaders.set("cache-control", "no-store");

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { error: "Authentication service is temporarily unavailable." },
      { status: 503 },
    );
  }
}
