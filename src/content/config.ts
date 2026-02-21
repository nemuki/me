import { defineCollection, z } from "astro:content";

const profile = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		nameJa: z.string(),
		role: z.string(),
		avatarUrl: z.string().url(),
	}),
});

const links = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		/** セクションの表示順（小さいほど先） */
		order: z.number(),
		links: z.array(
			z.object({
				label: z.string(),
				url: z.string().url(),
				sub: z.string(),
				/** Simple Icons のスラグ (https://simpleicons.org) */
				icon: z.string(),
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

export const collections = { profile, links, bio };
