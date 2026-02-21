import { defineCollection, z } from "astro:content";

const linkSchema = z.object({
	label: z.string(),
	url: z.string().url(),
	sub: z.string(),
	/** Simple Icons のスラグ (https://simpleicons.org) */
	icon: z.string(),
});

const site = defineCollection({
	type: "data",
	schema: z.object({
		profile: z.object({
			name: z.string(),
			nameJa: z.string(),
			role: z.string(),
			avatarUrl: z.string().url(),
		}),
		sections: z.array(
			z.object({
				title: z.string(),
				/** セクション上部に表示するテキスト（Markdown 非対応） */
				content: z.string().optional(),
				links: z.array(linkSchema).optional(),
			}),
		),
	}),
});

const bio = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string().optional(),
	}),
});

export const collections = { site, bio };
