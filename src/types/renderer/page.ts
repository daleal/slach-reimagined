import type { PageContextBuiltIn } from 'vite-plugin-ssr';

export type PageContext = {
  Page: object
  pageProps?: Record<string, unknown>
  urlPathname: string
} & PageContextBuiltIn;
