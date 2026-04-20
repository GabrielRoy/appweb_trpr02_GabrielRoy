import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Travail Pratique 2",
  description: "A VitePress Site",

  base: "/appweb_trpr02_GabrielRoy/",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
