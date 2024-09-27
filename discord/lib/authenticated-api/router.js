import express from 'express';

import { handleApiError } from './handle-api-error.js';
import { handleEndpointNotFound } from './handle-endpoint-not-found.js';
import { handleGetGuildMembership } from './handle-get-guild-membership.js';
import { handleGetWorlds } from './handle-get-worlds.js';
import { handleLaunchExisting } from './handle-launch-existing.js';
import { handleLaunchNew } from './handle-launch-new.js';
import { requireAuthentication } from './require-authentication.js';
import { requireGuildMembership } from './require-guild-membership.js';

/**
 * Dedicated router for authenticated (and authorized) endpoints
 */
export class AuthenticatedAPIRouter {
  /**
   * Create a new AuthenticatedAPIRouter
   * @param {Object} configuration
   * @param {*} configuration.db TODO:
   * @param {Function} configuration.fetch
   * @param {string} configuration.guildId Discord server id
   */
  constructor(configuration) {
    const {
      db,
      fetch,
      guildId,
    } = configuration;

    if (!db) throw new Error('missing db');
    if (!fetch) throw new Error('missing fetch');
    if (!guildId) throw new Error('missing guild id');

    this.configuration = configuration;
    // TODO: does freezing this prevent us from adding the db reference later?
    // or otherwise interfere? so frustrating that I can't seem to just
    // pass it around as a property/member
    // Object.freeze(this.configuration);

    this.initializeMiddleware();
  }

  /**
   * Initialize the authenticated API middleware
   */
  initializeMiddleware() {
    if (this.hasInitializedMiddleware) throw new Error('authenticated API middleware already initialized');
    this.hasInitializedMiddleware = true;

    const authenticatedApiRouter = express.Router();

    // All requests to these resources must be:
    // 1. authenticated
    // 2. authorized (members of target guild)
    authenticatedApiRouter.use(
      requireAuthentication,
      requireGuildMembership.bind(null, this.configuration.fetch, this.configuration.guildId)
    );

    // Deliver guild membership data to the frontend
    authenticatedApiRouter.get('/authorized', handleGetGuildMembership);

    authenticatedApiRouter.post('/launch', [
      // parse body form data
      express.urlencoded({ extended: true }),
      handleLaunchNew.bind(null, this.configuration.db),
    ]);

    authenticatedApiRouter.post('/launch/:id', [
      // parse body form data
      express.urlencoded({ extended: true }),
      handleLaunchExisting.bind(null, this.configuration.db),
    ]);

    authenticatedApiRouter.get('/worlds',
      handleGetWorlds.bind(null, this.configuration.db),
    );

    authenticatedApiRouter.use(handleApiError);

    // Any unhandled requests at this point must be 404s
    authenticatedApiRouter.use(handleEndpointNotFound);

    this.router = authenticatedApiRouter;
  }

  /**
   * The authenticated API middleware
   */
  get middleware() {
    return this.router;
  }
}
