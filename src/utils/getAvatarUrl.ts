import { getGravatarDataUrl } from "./getGravatar";

let cache: string | null = null;

/**
 * GRAVATAR_EMAIL が設定されていれば Gravatar を、なければ fallbackUrl を返す。
 * ビルド中は結果をキャッシュして重複フェッチを防ぐ。
 */
export async function getAvatarUrl(fallbackUrl: string): Promise<string> {
	if (cache !== null) return cache;

	const gravatarEmail = import.meta.env.GRAVATAR_EMAIL as string | undefined;
	if (gravatarEmail) {
		cache = (await getGravatarDataUrl(gravatarEmail)) ?? fallbackUrl;
	} else {
		cache = fallbackUrl;
	}
	return cache;
}
