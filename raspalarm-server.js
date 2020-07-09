const express = require('express');
var bodyParser = require('body-parser')
const fs = require('fs');

const AlarmList = require('./model/AlarmList');

var app = express();
var alarms = new AlarmList();

const PORT = process.env.PORT || 5005;

var list_alarms = () => {
  console.log('Getting alarms...');
  return alarms;
};

var save_alarm = (alarm) => {
  console.log(alarm);
};

app.get('/alarms', (req, res, next) => {
  res.send(list_alarms());
});

app.post('/alarms', async (req, res, next) => {
  console.log(req.body);
  res.send('ok');
  next();
});

app.listen(PORT, () => {
  console.log('raspalrm-server listen on port : ' + PORT);
});
