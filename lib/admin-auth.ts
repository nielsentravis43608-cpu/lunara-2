export const ADMIN_COOKIE = "lunara_admin";
export const adminPassword = () => process.env.LUNARA_ADMIN_PASSWORD || "LUNARA-LOCAL-2026";

export async function adminToken(password = adminPassword()) {
  const data = new TextEncoder().encode(`lunara:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
