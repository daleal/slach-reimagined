import express from 'express';
import compression from 'compression';
import sirv from 'sirv';
import { createServer } from 'vite';
import { renderPage } from 'vite-plugin-ssr';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // eslint-disable-line no-underscore-dangle

const __dirname = path.dirname(__filename); // eslint-disable-line no-underscore-dangle

const isProduction = process.env.NODE_ENV === 'production';
const root = `${__dirname}/..`;

const startServer = async () => {
  const app = express();

  app.use(compression());

  if (isProduction) {
    app.use(sirv(`${root}/dist/client`));
  } else {
    const viteDevMiddleware = (
      await createServer({
        root,
        appType: 'custom',
        server: {
          middlewareMode: true,
        },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get('*', async (req, res, next) => { // eslint-disable-line consistent-return
    const pageContextInit = { urlOriginal: req.originalUrl };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    }
    const { body, statusCode, contentType } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 8080;

  app.listen(port);

  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`);
};

startServer();
