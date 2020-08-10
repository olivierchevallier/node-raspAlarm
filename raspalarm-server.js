const express = require('express');
var bodyParser = require('body-parser')
const fs = require('fs');

const AlarmList = require('./model/AlarmList');

var app = express();
app.use(bodyParser.json());
var alarms = new AlarmList();

const PORT = process.env.PORT || 5005;

var list_alarms = () => {
  console.log('Getting alarms...');
  console.log(alarms.toString());
  return alarms;
};

var save_alarm = (alarm) => {
  alarms.append(alarm);
};

var delete_alarm = (alarm_id) => {
  alarms.delete(alarm_id);
};

app.get('/alarms', (req, res, next) => {
  res.send(list_alarms());
});

app.post('/alarms', async (req, res, next) => {
  save_alarm(req.body);
  res.send('alarm successfully appended');
  next();
});

app.delete('/alarms/:id', (req, res, next) => {
  let alarm_id = req.params.id;
  delete_alarm(alarm_id);
  res.send('alarm with id ' + alarm_id + ' successfully deleted' );
});

app.listen(PORT, () => {
  console.log('raspalrm-server listen on port : ' + PORT);
});
