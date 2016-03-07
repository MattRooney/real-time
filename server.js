const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const Poll = require('./lib/poll');
const port = process.env.PORT || 3000;
const socketIo = require('socket.io');
const io = socketIo(server);
const _ = require('lodash');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');

if (!module.parent) {
 server.listen(port, function () {
   console.log('CrwdSrc is listening on port ' + port + '.');
  });
}

/////////////////// ROUTES ////////////////////

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
  var pollData = request.body.poll;
  var responses = pollData.responses.map(function(response) {
    return response.trim().toLowerCase();
  });
  var poll = new Poll(pollData, responses);
  var id = poll.id;
  var adminId = poll.adminId;

  app.locals.polls[id] = poll;

  response.redirect('/polls/' + id + '/' + adminId);
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('poll', { poll: poll});
});

app.get('/polls/:id/:adminId', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('admin', { poll: poll});
});

///////////////// SOCKETS //////////////////////

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, message) {
    var poll = app.locals.polls[message.poll];
    if (channel === 'voteCast' && !poll.hasExpired()) {
      poll.votes[message.vote.toLowerCase()] += 1;
      socket.emit('currentVote', message.vote);
      io.sockets.emit('voteCount', poll);
    } else if (channel === 'closePoll') {
        poll.open = false;
        io.sockets.emit('pollClosed', poll);
    } else if (channel === 'voteCast' && poll.hasExpired()) {
        poll.open = false;
        io.sockets.emit('pollClosed', poll);
    } else if (channel === 'togglePrivate') {
        poll.private = !poll.private;
        io.sockets.emit('privateStatus', poll);
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

module.exports = app;
module.exports = server;
