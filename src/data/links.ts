export const profile = {
  name: "Naoki Takahashi",
  nameJa: "高橋 直樹",
  role: "Software Engineer",
  avatarUrl: "https://github.com/nemuki.png",
};

export type Link = {
  label: string;
  url: string;
  sub: string;
  /** Simple Icons のスラグ (https://simpleicons.org) */
  icon: string;
};

export type Section = {
  title: string;
  links: Link[];
};

// =====================================================
//  ここだけ編集すればサイトが更新されます
// =====================================================
export const sections: Section[] = [
  {
    title: "Tech 🚀",
    links: [
      { label: "GitHub",   url: "https://github.com/nemuki",  sub: "github.com/nemuki",  icon: "github" },
      { label: "Credly", url: "https://www.credly.com/users/nemuki/badges", sub: "credly.com", icon: "credly" },
      { label: "Zenn",     url: "https://zenn.dev/nemuki",    sub: "zenn.dev/nemuki",    icon: "zenn" },
      { label: "Qiita",    url: "https://qiita.com/nemuki",   sub: "qiita.com/nemuki",   icon: "qiita" },
    ],
  },
  {
    title: "SNS 🫶",
    links: [
      { label: "X (Twitter)", url: "https://x.com/nemuki_dev",               sub: "@nemuki_dev", icon: "x" },
      { label: "Bluesky",     url: "https://bsky.app/profile/nemuki",         sub: "bsky.app",    icon: "bluesky" },
      { label: "Threads",     url: "https://www.threads.net/@nemuki_dev",     sub: "@nemuki_dev", icon: "threads" },
      { label: "mixi2",       url: "https://mixi.social/@nemuki",             sub: "mixi.social", icon: "mixi" },
      { label: "Mastodon",    url: "https://mstdn.jp/@nemuki",                sub: "mstdn.jp",    icon: "mastodon" },
      { label: "Misskey",     url: "https://misskey.io/@nemuki",              sub: "misskey.io",  icon: "misskey" },
      { label: "Instagram",   url: "https://www.instagram.com/nemuki_dev/",   sub: "@nemuki_dev", icon: "instagram" },
    ],
  },
];
