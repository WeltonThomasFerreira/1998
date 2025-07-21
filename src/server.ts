import 'zone.js/node';

import {
  AngularNodeAppEngine,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(process.cwd(), 'dist/1998/browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    angularApp
      .handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next(),
      )
      .catch(next);
  },
);

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */

const port = process.env['PORT'] || 4000;
console.log('Trying to start the server...');
app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
    throw error;
  }
  console.log(`Node Express server listening on http://localhost:${port}`);
});
