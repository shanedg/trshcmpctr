import express from 'express';

import { handleError } from './handlers/handle-error.js';
import { handleRedirect } from './handlers/handle-redirect.js';
import { handleRenderAuthenticated } from './handlers/handle-render-authenticated.js';

/**
 * Dedicated router for rendering an authenticated html view
 */
export class AuthenticatedHTMLRouter {
  /**
   * Create a new AuthenticatedHTMLRouter
   * @param {Object} configuration
   * @param {string} configuration.htmlDirectory
   * @param {string} configuration.htmlFilename
   * @param {string[]} configuration.paths
   */
  constructor(configuration) {
    const {
      htmlDirectory,
      htmlFilename,
      paths,
    } = configuration;

    if (!htmlDirectory) throw new Error('missing html directory');
    if (!htmlFilename) throw new Error('missing html filename');
    if (!paths) throw new Error('missing paths');

    this.configuration = Object.freeze(configuration);

    this.initializeMiddleware();
  }

  /**
   * Initialize the authenticated view middleware
   */
  initializeMiddleware() {
    if (this.hasInitialized) throw new Error('authenticated view middleware already initialized');
    this.hasInitialized = true;

    const {
      htmlDirectory,
      htmlFilename,
      paths,
    } = this.configuration;

    const trshcmpctrClientRouter = express.Router();

    trshcmpctrClientRouter.get(paths, [
      handleRenderAuthenticated.bind(null, htmlDirectory, htmlFilename),
      // Redirect to login if not authenticated
      handleRedirect.bind(null, '/login')
    ]);

    // Serve application static assets
    trshcmpctrClientRouter.use(express.static(htmlDirectory));
    trshcmpctrClientRouter.use(handleError);

    this.router = trshcmpctrClientRouter;
  }

  /**
   * The authenticated view middleware
   */
  get middleware() {
    return this.router;
  }
}
