'use strict'
const crypto = require('crypto');
const moment = require('moment');

class Poll {
  constructor(data, responses) {
    this.title = data.title;
    this.responses = responses;
    this.id = this.generateId();
    this.adminId = this.generateAdminId();
    this.url = 'https://crwdsrc.herokuapp.com/polls/' + this.id;
    this.adminUrl = 'https://crwdsrc.herokuapp.com/polls/' + this.id + '/' + this.adminId;
    this.votes = this.createCounter();
    this.open = true;
    this.private = true;
  }
}

Poll.prototype.generateId = function() {
  return crypto.randomBytes(10).toString('hex');
}

Poll.prototype.generateAdminId = function() {
  return crypto.randomBytes(4).toString('hex');
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
