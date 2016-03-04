const http = require('http');
const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const Poll = require('./lib/poll')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);

app.locals.title = 'CrwdSrc';
app.locals.polls = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/admin', (request, response) => {
  response.render('admin');
});

app.post('/polls', (request, response) => {
  if (!request.body.poll) { return response.sendStatus(400); }
  var poll = new Poll(request.body.poll);
  var id = poll.id;

  app.locals.polls[id] = poll

  response.redirect('/polls/' + id);
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('poll', { poll: poll});
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
