const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const path = require('path');
const bodyParser = require('body-parser');

const Poll = require('./lib/poll')

const port = process.env.PORT || 3000;

const socketIo = require('socket.io');
const io = socketIo(server)

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');

if (!module.parent) {
 server.listen(port, function () {
   console.log('CrwdSrc is listening on port ' + port + '.');
  });
}

app.locals.title = 'CrwdSrc';
app.locals.polls = {};

var votes = {};
var _ = require('lodash');


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

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
        votes[socket.id] = message;
        socket.emit('currentVote', message);
        socket.emit('voteCount', countVotes(votes));
      }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

function countVotes(votes) {
  var voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };
  for (var vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}

module.exports = app;
module.exports = server;
