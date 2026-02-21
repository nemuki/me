// @ts-check

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},

		imageService: "cloudflare",
	}),

	integrations: [mdx()],
});
