import test from 'ava';
import { spy } from 'sinon';

import { handleGetGuildMembership } from './handle-get-guild-membership.js';

test('sends guild membership data', t => {
  const request = { send: spy() };
  const response = {
    log: { debug: spy() },
    session: {
      guildMembershipData: { user: 'data' },
    },
  };

  handleGetGuildMembership(response, request);
  
  const sendCalls = request.send.getCalls();
  t.plan(2);
  t.is(sendCalls.length, 1);
  t.deepEqual(sendCalls[0].args[0], { user: 'data' });
});
