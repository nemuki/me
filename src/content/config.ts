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
				links: z.array(linkSchema),
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
