'use strict'
const crypto = require('crypto');
const moment = require('moment');

class Poll {
  constructor(data) {
    this.title = data.title;
    this.responses = data.responses;
    this.id = this.generateId();
    this.url = 'https://crwdsrc.herokuapp.com/polls/' + this.id;
    this.private = false;
    this.votes = this.createCounter();
  }
}

Poll.prototype.generateId = function() {
  return crypto.randomBytes(10).toString('hex');
}

Poll.prototype.createCounter = function () {
  var votes = {}
  var choices = this.responses;

  choices.forEach(function(choice){
    votes[choice] = 0;
  });

  return votes;
}

module.exports = Poll;
