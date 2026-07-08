import test from 'ava';
import { spy } from 'sinon';

import { requireAuthentication } from './require-authentication.js';

/**
 * Helper to create requests for testing
 * @param {Object | undefined} session Extra data to add to the request session
 * @returns A minimal mock request object
 */
const getRequest = (session = {}) => ({
  log: {
    debug: spy(),
  },
  session: {
    ...session,
  },
});

test('sends 401 if not authenticated', async t => {
  const nextSpy = spy();
  const response = { sendStatus: spy() };

  await requireAuthentication(getRequest(), response, nextSpy);

  const sendCalls = response.sendStatus.getCalls();
  t.plan(2);
  t.is(sendCalls.length, 1);
  t.is(sendCalls[0].args[0], 401);
});

test('calls next middleware if authenticated', async t => {
  const nextSpy = spy();
  const authenticatedRequest = getRequest({
    oauth: { access_token: 'some-access-token' }
  });

  await requireAuthentication(authenticatedRequest, {}, nextSpy);

  const nextCalls = nextSpy.getCalls();
  t.plan(1);
  t.is(nextCalls.length, 1);
});
