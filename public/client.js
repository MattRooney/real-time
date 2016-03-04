var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices li');
var currentPoll = document.getElementById('vote-count');
var yourVote = document.getElementById('your-vote');


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
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
})
