'use strict'
const crypto = require('crypto');
const moment = require('moment');

class Poll {
  constructor(input) {
    this.title = input.title;
    this.responses = input.responses;
    this.id = this.generateId();
    this.url = 'https://crwdsrc.herokuapp.com/polls/' + this.id;
    this.votes = {}
  }
}

Poll.prototype.generateId = function() {
  return crypto.randomBytes(10).toString('hex');
}

module.exports = Poll;
