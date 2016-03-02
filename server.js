const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Real Time';

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
