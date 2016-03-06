var socket = io();
var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices li');
var currentPoll = document.getElementById('vote-count');
var yourVote = document.getElementById('your-vote');
var chart = document.getElementById('chart');

$(document).ready(function() {
  addResponse();
});

function addResponse() {
  $('#add-response').on("click", function() {
    $('#poll-form').append(
      "<input type='text' class='poll-responses' name='poll[responses][]' placeholder='responses'/>"
    )
  });
}

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
  var voteTable = ""
  for(var i = 0; i < poll.responses.length; i++) {
    var voteTable = voteTable.concat(
    '<tr>'
    + '<td>' + poll.responses[i] + '</td>'
    + '<td>' + poll.votes[poll.responses[i]] + '</td>'
    + '</tr>'
    + '</tbody>'
  )}
  currentPoll.innerHTML = voteTable + '</thead>';
});
