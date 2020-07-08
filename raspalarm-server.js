var express = require('express');
const fs = require('fs');

var app = express();

const PORT = process.env.PORT || 5005;

var listAlarms = () => {
  console.log('Getting alarms...');
  let data = fs.readFileSync('./data/alarms.json');
  let alarms = JSON.parse(data);
  console.log(alarms);
  return alarms;
};

app.get('/alarms', (req, res, next) => {
  res.send(listAlarms());
});

app.listen(PORT, () => {
  console.log('raspalrm-server listen on port : ' + PORT);
});
