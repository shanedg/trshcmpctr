import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import expressSesssion from 'express-session';
import handlebars from 'hbs';
import pinoHttp from 'pino-http';
import store from 'session-file-store';

import manifest from '@trshcmpctr/client' assert { type: 'json' };
// import pathsManifest from '@trshcmpctr/client/paths' assert { type: 'json' };

import { AuthenticatedAPIRouter } from './authenticated-api/router.js';
import { AuthenticatedHTMLRouter } from './authenticated-html-router.js';
import config from './config.json' assert { type: 'json' };
import { DB } from './db.js';
import { LoginRouter } from './login-router.js';

// Support overriding redirectUri from environment for cypress testing
const optionalArgumentOverrideRedirectUri = process.argv.length > 2 ? process.argv[2] : null;

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

// authorization tokens are valid for 1 week
// so set session length to 1 week in seconds
const sessionLength = 7 * 24 * 60 * 60;

const SessionFileStore = store(expressSesssion);

app.use(expressSesssion({
  cookie: {
    // maxAge is in milliseconds
    maxAge: sessionLength * 1000,
  },
  // resave is deprecated
  resave: false,
  // saveUninitialized is deprecated
  saveUninitialized: false,
  secret: sessionSecret,
  store: new SessionFileStore({
    // https://www.npmjs.com/package/session-file-store#options
    // ttl is seconds
    ttl: sessionLength,
  }),
}));

const loginRouter = new LoginRouter({
  clientId,
  clientSecret,
  fetch,
  // Redirect to home once authenticated
  loginRedirect: '/',
  redirectUri: optionalArgumentOverrideRedirectUri ?? redirectUri,
});
app.use(loginRouter.middleware);

const clientUrl = new URL(await import.meta.resolve('@trshcmpctr/client'));
const clientDirectory = dirname(clientUrl.pathname);

// TODO: is the subpath export worth the effort?
// should it be a more general purpose "constants" subpath?
// that would make sense to index into the manifest of!
const clientPathUrl = new URL(await import.meta.resolve('@trshcmpctr/client/paths'));
const clientPathDirectory = dirname(clientPathUrl.pathname);

// FIXME: 'import()' expressions are not supported yet ???
// This should not be a problem but adjusting the engines field
// and overwriting the rule to set the node version explicitly
// doesn't seem to be working :(
// eslint-disable-next-line node/no-unsupported-features/es-syntax -- eslint(node/no-unsupported-features/es-syntax)
const paths = await import(`${clientPathDirectory}/paths.js`);

const authenticatedViewRouter = new AuthenticatedHTMLRouter({
  htmlDirectory: clientDirectory,
  htmlFilename: manifest['index.html'],
  paths: paths.default,
});
app.use(authenticatedViewRouter.middleware);

const db = new DB();

const authenticatedApiRouter = new AuthenticatedAPIRouter({
  db: db.db,
  fetch,
  guildId,
});
app.use('/api/v1', authenticatedApiRouter.middleware);

app.listen(port, () => pinoLogger.logger.info(`App listening at http://localhost:${port}`));
