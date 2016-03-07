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
    this.private = false;
    this.timeoutDate = data['timeout-date'];
    this.timeoutTime = data['timeout-time'];
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

Poll.prototype.hasExpired = function() {
  var now = moment().format('x');
  var timeoutDateAndTime = this.timeoutDate + ' ' + this.timeoutTime;
  var expiration = moment(timeoutDateAndTime).format('x');
  var nowNumber = Number.parseInt(now);
  var expirationNumber = Number.parseInt(expiration);
  return now >= expiration;
}

module.exports = Poll;
