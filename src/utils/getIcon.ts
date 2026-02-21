import * as simpleIcons from "simple-icons";

export type IconData = {
  svg: string;
  hex: string;
};

/** Simple Icons のスラグから SVG とブランドカラーを返す。未登録なら null */
export function getIcon(slug: string): IconData | null {
  // "github" → "siGithub", "x" → "siX"
  const key =
    "si" + slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

  const raw = (simpleIcons as Record<string, unknown>)[key];
  if (!raw || typeof raw !== "object") return null;

  const icon = raw as { svg: string; hex: string };

  // SVG の <svg> タグにサイズとブランドカラーを注入
  const svg = icon.svg.replace(
    "<svg ",
    `<svg width="20" height="20" fill="#${icon.hex}" aria-hidden="true" `,
  );

  return { svg, hex: icon.hex };
}
