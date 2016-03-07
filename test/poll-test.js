const assert = require('assert');
const fixtures = require('./fixtures');
const Poll = require('../lib/poll');

describe('Poll', () => {

  it('should exist', () => {
    assert(Poll);
  });

  it('should have a title', () => {
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert.equal(poll.title, 'test poll');
  });

  it('should have responses', () => {
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert.equal(poll.responses[0], 'yes');
    assert.equal(poll.responses[1], 'no');
  });

  it('should have a unique Id', () => {
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);
    var pollTwo = new Poll(fixtures.validPoll, ['maybe', 'maybe not']);
    assert.notEqual(poll.id, pollTwo.id);
  });

  it('should have votes', () => {
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert.equal(poll.votes['yes'], 0);
    assert.equal(poll.votes['no'], 0);
  });

  it('should default to being open, not closed', () => {
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert.equal(poll.open, true);
  });

  it('should default to the votes being shared with voters', () => {
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert.equal(poll.private, false);
  });

  it('should have a timeoutDate and timeoutTime', () => {
    fixtures.validPoll['timeout-date'] = fixtures.validPoll.timeoutDate
    fixtures.validPoll['timeout-time'] = fixtures.validPoll.timeoutTime
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert.equal(poll.timeoutDate, 'March 17, 2016');
    assert.equal(poll.timeoutTime, '12:00');
  });

  it('can expire', () => {
    fixtures.validPoll['timeout-date'] = 'March 1, 2015'
    fixtures.validPoll['timeout-time'] = '12:00'
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert(poll.hasExpired())
  });

  it('doesnt automatically expire', () => {
    fixtures.validPoll['timeout-date'] = 'March 8, 2016'
    fixtures.validPoll['timeout-time'] = '17:00'
    var poll = new Poll(fixtures.validPoll, ['yes', 'no']);

    assert.equal(poll.hasExpired(), false)
  });

});
