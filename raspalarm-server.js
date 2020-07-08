var express = require('express');
var app = express();
const PORT = process.env.PORT || 5005;

app.get('/', (req, res, next) => {
  res.send('Hello world !');
});

app.listen(PORT, () => {
  console.log('raspalrm-server listen on port : ' + PORT);
});