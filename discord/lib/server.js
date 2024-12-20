import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import expressSesssion from 'express-session';
import handlebars from 'hbs';
import { JSONFilePreset } from 'lowdb/node';
import pinoHttp from 'pino-http';
import store from 'session-file-store';

import manifest from '@trshcmpctr/client' assert { type: 'json' };
import { paths } from '@trshcmpctr/client/paths';

import { AuthenticatedAPIRouter } from './authenticated-api/router.js';
import { AuthenticatedHTMLRouter } from './authenticated-html-router.js';
import config from './config.json' assert { type: 'json' };
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

const authenticatedViewRouter = new AuthenticatedHTMLRouter({
  htmlDirectory: clientDirectory,
  htmlFilename: manifest['index.html'],
  paths,
});
app.use(authenticatedViewRouter.middleware);

const defaultData = { worlds: [] };
const pathToDbStorage = `${join(__dirname, '..')}/db.json`;
const db = await JSONFilePreset(pathToDbStorage, defaultData);

const authenticatedApiRouter = new AuthenticatedAPIRouter({
  fetch,
  guildId,
}, db);
app.use('/api/v1', authenticatedApiRouter.middleware);

app.listen(port, () => pinoLogger.logger.info(`App listening at http://localhost:${port}`));
