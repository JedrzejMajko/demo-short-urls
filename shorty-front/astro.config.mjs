// @ts-check
import { defineConfig, envField } from 'astro/config'
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";


const { PORT } = loadEnv(process.env.NODE_ENV + "", process.cwd(), "");


export default defineConfig(
  {
    server: {
      port: Number(PORT) || 3000,
    },
    prefetch: true,
    i18n: {
        locales:  ["en"],
        defaultLocale: "en",
      },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],

  env: {
    schema: {
      SHORTY_API_DOMAIN: envField.string({ context: "client", access: "public" }),
      GOOGLE_PUBLIC_API_KEY: envField.string({ context: "client", access: "public" }),
      SHORTY_API_ABORT_TIMEOUT: envField.number({ context: "client", access: "public" }),
    }
  }

});

