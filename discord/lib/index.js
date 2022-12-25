import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cookieSession from 'cookie-session';
import express from 'express';
import handlebars from 'hbs';
import pinoHttp from 'pino-http';

import manifest from '@trshcmpctr/client' assert { type: 'json' };

import { authenticatedApiRouter } from './authenticated-api/router';
import config from './config.json' assert { type: 'json' };
import {
  createAuthenticatedRenderHandler,
  createAuthorizationCodeGrantHandler,
  createLoginRenderHandler,
  handleError,
} from './handlers';

const {
  clientId,
  clientSecret,
  guildId,
  port,
  redirectUri,
  sessionSecret,
} = config;

const { __express: handlebarsForExpress } = handlebars;

const app = express();
const pinoLogger = pinoHttp({
  autoLogging: false,
  level: process.env.DISCORD_LOG_LEVEL || 'info',
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', handlebarsForExpress);

app.use(pinoLogger);
app.use(cookieSession({
  // keys: [sessionSecret1, sessionSecret2],
  // maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week (how long tokens are valid)
  // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  // maxAge: 10 * 60 * 1000 // 10 minutes
  maxAge: 60 * 1000, // 1 minute
  secret: sessionSecret,
}));

/**
 * Create a handler that redirects to the provided destination
 * @param {string} redirectTo Path that the handler should redirect to
 * @returns Handler that redirects to the provided destination
 */
const createRedirectHandler = redirectTo => {
  return (_request, response, _next) => {
    response.redirect(redirectTo);
  };
};

const renderLogin = createLoginRenderHandler({ clientId, redirectUri });

const clientUrl = new URL(await import.meta.resolve('@trshcmpctr/client'));
const clientPublic = dirname(clientUrl.pathname);

const renderAuthenticated = createAuthenticatedRenderHandler({
  htmlDirectory: clientPublic,
  htmlFilename: manifest['index.html'],
});
const handleAuthorizationCodeGrant = createAuthorizationCodeGrantHandler(fetch, { clientId, clientSecret, guildId, redirectUri });

// Dedicated router for API requests that the application will make
app.use('/api/v1', authenticatedApiRouter);

app.get('/login', [
  renderLogin,
  // Redirect to app if already authenticated
  createRedirectHandler('/'),
]);

app.get('/auth', [
  handleAuthorizationCodeGrant,
  // Redirect to app once authenticated
  createRedirectHandler('/'),
]);

app.get('/', [
  renderAuthenticated,
  // Redirect to login if not authenticated
  createRedirectHandler('/login'),
]);

// Always serve application static assets
app.use(express.static(clientPublic));

app.use(handleError);

app.listen(port, () => pinoLogger.logger.info(`App listening at http://localhost:${port}`));
