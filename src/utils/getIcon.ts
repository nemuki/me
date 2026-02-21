import * as simpleIcons from "simple-icons";

export type IconData = {
  svg: string;
  /** ライトモード用ブランドカラー */
  hex: string;
  /** ダークモード用カラー（暗すぎる場合は白） */
  hexDark: string;
};

/** WCAG 2.x 相対輝度 (0=黒, 1=白) */
function relativeLuminance(hex: string): number {
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const r = toLinear(parseInt(hex.slice(0, 2), 16) / 255);
  const g = toLinear(parseInt(hex.slice(2, 4), 16) / 255);
  const b = toLinear(parseInt(hex.slice(4, 6), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Simple Icons のスラグから SVG とブランドカラーを返す。未登録なら null */
export function getIcon(slug: string): IconData | null {
  // "github" → "siGithub", "x" → "siX"
  const key =
    "si" +
    slug.charAt(0).toUpperCase() +
    slug.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

  const raw = (simpleIcons as Record<string, unknown>)[key];
  if (!raw || typeof raw !== "object") return null;

  const icon = raw as { svg: string; hex: string };

  // 輝度が低い（暗い）色はダークモードで白に置き換える
  const hexDark = relativeLuminance(icon.hex) < 0.15 ? "ffffff" : icon.hex;

  // fill は CSS カスタムプロパティで制御するため SVG に埋め込まない
  const svg = icon.svg.replace(
    "<svg ",
    `<svg width="20" height="20" aria-hidden="true" `,
  );

  return { svg, hex: icon.hex, hexDark };
}
