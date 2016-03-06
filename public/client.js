var socket = io();
var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices li');
var currentPoll = document.getElementById('vote-count');
var yourVote = document.getElementById('your-vote');
var chart = document.getElementById('chart');


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', { poll: this.id, vote: this.innerText });
  });
}

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('currentVote' ,function(vote) {
  yourVote.innerText = 'You voted for ' + vote;
});

socket.on('voteCount', function(poll) {
  var voteTable = poll.responses.forEach(function(response) {
          '<tr>'
          + '<td>' + response + '</td>'
          + '<td>' + poll.votes[response] + '</td>'
          + '</tr>'
        + '</tbody>'
        })
  return currentPoll.innerHTML = voteTable + '</thead>'
});
