exports.validPoll = {
  title: 'test poll',
  responses: ['yes', 'no'],
  id: '12341234',
  adminId: '5678',
  url: 'https://crwdsrc.herokuapp.com/polls/' + '12341234',
  adminUrl: 'https://crwdsrc.herokuapp.com/polls/' + '12341234' + '/' + '5678',
  votes: { yes: 0, no: 0},
  open: true,
  private: false,
  timeoutDate: 'March 17, 2016',
  timeoutTime: '12:00'
};
