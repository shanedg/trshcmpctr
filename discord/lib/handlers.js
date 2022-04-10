// We have to use node-fetch@^2 because node-fetch@>=3 is esm-only.
const fetch = require('node-fetch');

const { clientId, clientSecret, guildId, port } = require('./config.json');
const { authFromCode, batchRequests, getFetchWithOauth, getGuildById } = require('./utils');

/**
 * Get data for logged-in view
 * @param {Function} fetch Fetch implementation
 * @param {boolean} newSession If session is new
 * @returns Logged-in template local variables
 */
const getLoggedInData = async (fetch, newSession) => {
  const commonEndpointUrls = [
    'https://discord.com/api/users/@me',
    'https://discord.com/api/users/@me/guilds',
    // TODO: alternatively: https://discord.com/developers/docs/resources/user#get-current-user-guild-member
    // requires: guilds.members.read
    // `https://discord.com/api/users/@me/guilds/${guildId}/member`
  ];
  const [user, guilds] = await batchRequests(fetch, commonEndpointUrls);
  const { avatar, discriminator, id, username } = user;

  // Guilds won't be an array if the request fails (rate limited).
  const guild = Array.isArray(guilds) && getGuildById(guilds, guildId);

  const data = {
    avatar,
    discriminator,
    guild,
    id,
    newSession,
    username,
  };
  return data;
};

/**
 * Render logged-in content after getting a fresh auth token
 * @param {Object} request Request object
 * @param {Object} response Response object
 * @param {Function} _next Middleware callback
 */
const getNewToken = async (request, response, _next) => {
  request.log.debug('get new token');
  const { code } = request.query;
  const oauthResult = await authFromCode(fetch, { code, clientId, clientSecret, port });
  const oauthFinal = await oauthResult.json();

  const nowInSeconds = Date.now()/1000;

  request.session.oauth = oauthFinal;
  request.session.oauthExpires = nowInSeconds + oauthFinal.expires_in;

  const fetchWithOauth = getFetchWithOauth(fetch, oauthFinal);
  const data = await getLoggedInData(fetchWithOauth, true, guildId);
  response.render('logged-in', data);
};

/**
 * Render login screen for un-auth'd sessions
 * @param {Object} request Request object
 * @param {Object} response Response object
 * @param {Function} next Middleware callback
 */
const renderLogin = (request, response, next) => {
  request.session.views = (request.session.views || 0) + 1;

  const nowInSeconds = Date.now()/1000;

  const { code } = request.query;
  const sessionHasToken = request.session.oauth && request.session.oauth.access_token;
  const tokenIsNotExpired = request.session.oauthExpires > nowInSeconds;
  const hasSession = sessionHasToken && tokenIsNotExpired;

  if (!code && !hasSession) {
    request.log.debug('render login page');
    response.render('index', { clientId });
    return;
  }
  next();
};

/**
 * Render logged-in content using the existing session token
 * @param {Object} request Request object
 * @param {Object} response Response object
 * @param {Function} next Middleware callback
 * @returns 
 */
const reuseSessionToken = async (request, response, next) => {
  if (request.session.oauth && request.session.oauth.access_token) {
    request.log.debug('reuse session token');
    const fetchWithOauth = getFetchWithOauth(fetch, request.session.oauth);
    const data = await getLoggedInData(fetchWithOauth, false, guildId);
    response.render('logged-in', data);
    return;
  }
  next();
};

module.exports = {
  getLoggedInData,
  getNewToken,
  renderLogin,
  reuseSessionToken,
};
