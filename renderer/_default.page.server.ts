import { renderToString } from '@vue/server-renderer';
import { dangerouslySkipEscape } from 'vite-plugin-ssr';
import { createHead, renderHeadToString } from '@vueuse/head';
import { scaffoldHead } from '../src/utils/head';

import { createApp } from './main';
import type { PageContext } from '../src/types/renderer/page';

export const passToClient = ['pageProps', 'urlPathname', 'routeParams'];

const { title, meta } = scaffoldHead({
  title: 'Slach',
  description: 'Recibe pagos por transferencia',
});

const defaultHead = {
  title,
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
  meta: [
    ...meta,
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://slach.cl' },
    { property: 'twitter:url', content: 'https://slach.cl' },
  ],
};

export const render = async (pageContext: PageContext) => {
  const { redirectTo } = pageContext;
  if (redirectTo) {
    return {
      pageContext: {
        redirectTo,
      },
    };
  }

  const application = createApp(pageContext);
  const head = createHead(defaultHead);

  application.use(head);

  const appHtml = await renderToString(application);
  const {
    headTags, htmlAttrs, bodyAttrs, bodyTags,
  } = renderHeadToString(head);

  const documentHtml = dangerouslySkipEscape(`
    <!DOCTYPE html>
    <html${htmlAttrs}>
      <head>
        ${headTags}
      </head>
      <body${bodyAttrs}>
        <div id="app">${appHtml}</div>
        ${bodyTags}
      </body>
    </html>
  `);

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do
      // page redirection: https://vite-plugin-ssr.com/page-redirection
    },
  };
};
