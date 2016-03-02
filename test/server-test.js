const assert = require('assert');
const app = require('../server');
const request = require('request');
const fixtures = require('./fixtures');

describe('Server', () => {

  before(done => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(title),
               `"${response.body}" does not include "${title}".`);
        done();
      });
    });

  });

  describe('POST /polls', () => {

    beforeEach(() => {
      app.locals.polls = {};
    });

    it('should receive and store data', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/polls', { form: payload }, (error, response) => {
        if (error) { done(error); }

        var pollCount = Object.keys(app.locals.polls).length;

        assert.equal(pollCount, 1, `Expected 1 polls, found ${pollCount}`);

        done();
      });
    });

  });

});
