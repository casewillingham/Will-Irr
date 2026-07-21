/**
 * One-time Google Business Profile OAuth setup.
 *
 * Prerequisites:
 * 1. Cloud project approved for GBP APIs (contact form — see README)
 * 2. Enable: My Business Account Management, Business Information, Google My Business API
 * 3. OAuth client (Desktop or Web) with redirect http://127.0.0.1:8787/oauth2/callback
 *
 * Usage:
 *   GOOGLE_GBP_CLIENT_ID=... GOOGLE_GBP_CLIENT_SECRET=... npm run gbp:setup
 */

import http from "node:http";
import { exec } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const REDIRECT_URI = "http://127.0.0.1:8787/oauth2/callback";
const SCOPE = "https://www.googleapis.com/auth/business.manage";
const PORT = 8787;

function requiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing ${name}. Set it in the environment or .env.local`);
    process.exit(1);
  }
  return value;
}

async function loadDotEnvLocal() {
  try {
    const { readFile } = await import("node:fs/promises");
    const text = await readFile(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // no .env.local yet
  }
}

function openBrowser(url) {
  const cmd =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

function waitForAuthCode() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
        if (url.pathname !== "/oauth2/callback") {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const error = url.searchParams.get("error");
        const code = url.searchParams.get("code");
        if (error) {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end(`<h1>Auth error</h1><p>${error}</p>`);
          server.close();
          reject(new Error(error));
          return;
        }
        if (!code) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing code");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          "<h1>Connected</h1><p>You can close this tab and return to the terminal.</p>",
        );
        server.close();
        resolve(code);
      } catch (err) {
        reject(err);
      }
    });
    server.listen(PORT, "127.0.0.1");
  });
}

async function exchangeCode(clientId, clientSecret, code) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error_description || data.error || "Token exchange failed");
  }
  return data;
}

async function gbpGet(path, accessToken, base) {
  const res = await fetch(`${base}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "X-GOOG-API-FORMAT-VERSION": "2",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || JSON.stringify(data);
    throw new Error(`${path}: ${msg}`);
  }
  return data;
}

async function main() {
  await loadDotEnvLocal();

  const clientId = requiredEnv("GOOGLE_GBP_CLIENT_ID");
  const clientSecret = requiredEnv("GOOGLE_GBP_CLIENT_SECRET");

  console.log("\nGoogle Business Profile — OAuth setup\n");
  console.log(`Redirect URI (must match your OAuth client):\n  ${REDIRECT_URI}\n`);

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPE);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("Opening browser for Google consent…");
  console.log(authUrl.toString(), "\n");
  openBrowser(authUrl.toString());

  const code = await waitForAuthCode();
  console.log("Authorization code received. Exchanging for tokens…");

  const tokens = await exchangeCode(clientId, clientSecret, code);
  if (!tokens.refresh_token) {
    console.warn(
      "No refresh_token returned. Revoke app access at https://myaccount.google.com/permissions and re-run with prompt=consent.",
    );
  }

  const accessToken = tokens.access_token;
  console.log("\nListing Business Profile accounts…");

  let accounts = [];
  try {
    const accountsRes = await gbpGet(
      "/accounts",
      accessToken,
      "https://mybusinessaccountmanagement.googleapis.com/v1",
    );
    accounts = accountsRes.accounts || [];
  } catch (err) {
    console.error("\nFailed to list accounts:", err.message);
    console.error(
      "\nIf this is PERMISSION_DENIED / 403, your Cloud project may not be approved for GBP APIs yet.",
    );
    console.error(
      "Request access: Google Cloud → project → GBP API contact form (Application for Basic API Access).",
    );
    if (tokens.refresh_token) {
      console.log("\nYou still got a refresh token — save it for later:\n");
      console.log(`GOOGLE_GBP_REFRESH_TOKEN=${tokens.refresh_token}`);
    }
    process.exit(1);
  }

  if (!accounts.length) {
    console.error("No accounts found for this Google user.");
    process.exit(1);
  }

  console.log("\nAccounts:");
  accounts.forEach((a, i) => {
    console.log(`  [${i}] ${a.name}  (${a.accountName || a.type || "account"})`);
  });

  const rl = createInterface({ input, output });
  let accountIndex = 0;
  if (accounts.length > 1) {
    const answer = await rl.question(
      `\nPick account index [0-${accounts.length - 1}] (default 0): `,
    );
    accountIndex = Number(answer.trim() || "0");
  }
  const account = accounts[accountIndex];
  if (!account?.name) {
    console.error("Invalid account selection");
    process.exit(1);
  }

  console.log(`\nListing locations for ${account.name}…`);
  let locations = [];
  try {
    const locRes = await gbpGet(
      `/${account.name}/locations?readMask=name,title,storefrontAddress,metadata`,
      accessToken,
      "https://mybusinessbusinessinformation.googleapis.com/v1",
    );
    locations = locRes.locations || [];
  } catch (err) {
    console.error("Failed to list locations:", err.message);
    process.exit(1);
  }

  if (!locations.length) {
    console.error("No locations on this account.");
    process.exit(1);
  }

  console.log("\nLocations:");
  locations.forEach((loc, i) => {
    const title = loc.title || "(untitled)";
    const addr = loc.storefrontAddress?.addressLines?.join(", ") || "service-area / no public address";
    console.log(`  [${i}] ${title}`);
    console.log(`      name: ${loc.name}`);
    console.log(`      ${addr}`);
  });

  let locationIndex = 0;
  if (locations.length > 1) {
    const answer = await rl.question(
      `\nPick location index [0-${locations.length - 1}] (default 0): `,
    );
    locationIndex = Number(answer.trim() || "0");
  }
  await rl.close();

  const location = locations[locationIndex];
  if (!location?.name) {
    console.error("Invalid location selection");
    process.exit(1);
  }

  // Business Information returns locations/{id}; reviews API needs accounts/{aid}/locations/{lid}
  const locationId = String(location.name).replace(/^locations\//, "");
  const accountId = String(account.name).replace(/^accounts\//, "");
  const locationName = `accounts/${accountId}/locations/${locationId}`;

  console.log("\n——— Add these to .env.local (and Vercel) ———\n");
  console.log(`GOOGLE_GBP_CLIENT_ID=${clientId}`);
  console.log(`GOOGLE_GBP_CLIENT_SECRET=${clientSecret}`);
  if (tokens.refresh_token) {
    console.log(`GOOGLE_GBP_REFRESH_TOKEN=${tokens.refresh_token}`);
  } else {
    console.log("# GOOGLE_GBP_REFRESH_TOKEN=<missing — re-run after revoking app access>");
  }
  console.log(`GOOGLE_GBP_ACCOUNT_ID=${accountId}`);
  console.log(`GOOGLE_GBP_LOCATION_ID=${locationId}`);
  console.log(`# or combined:`);
  console.log(`# GOOGLE_GBP_LOCATION_NAME=${locationName}`);
  console.log("\nThen restart the Next server and open /api/reviews\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
