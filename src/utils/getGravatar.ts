import { createHash } from "node:crypto";

/**
 * ビルド時にメアドから Gravatar 画像を取得し Base64 Data URL として返す。
 * HTML にハッシュも URL も残らないためメアドが推測されにくい。
 */
export async function getGravatarDataUrl(
  email: string,
  size = 200,
): Promise<string | null> {
  const hash = createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");

  const url = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}
