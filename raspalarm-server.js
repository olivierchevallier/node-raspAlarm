const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');

const AlarmList = require('./model/AlarmList');

var app = express();
app.use(bodyParser.json());
var alarms = new AlarmList();

const PORT = process.env.PORT || 5005;

var get_alarm = (alarm_id) => {
  console.log('Getting alarm ' + alarm_id + '...');
  try {
    let alarm = alarms.get(alarm_id);
    console.log(alarm.toString());
    return alarm;
  } catch (e) {
    throw e;
  }
};

var list_alarms = () => {
  console.log('Getting alarms...');
  console.log(alarms.toString());
  return alarms;
};

var save_alarm = (alarm) => {
  alarms.append(alarm);
};

var delete_alarm = (alarm_id) => {
  try {
    alarms.delete(alarm_id);
  } catch (e) {
    throw e;
  }
};

var edit_alarm = (alarm_id, alarm) => {
  try {
    alarms.edit(alarm_id, alarm);
  } catch (e) {
    throw e;
  }
};

app.get('/alarms/:id', (req, res, next) => {
  let alarm_id = req.params.id;
  try {
    let alarm = get_alarm(alarm_id);
    res.send(alarm);
  } catch (e) {
    console.log('Error while getting alarm');
    console.log(e);
    res.send('Alarm with id ' + alarm_id + ' cannot be got');
  }
});

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
  try {
    delete_alarm(alarm_id);
    res.send('alarm with id ' + alarm_id + ' successfully deleted');
  } catch (e) {
    console.log('Error while delete alarm ! ');
    console.log(e);
    res.send('alarm with id ' + alarm_id + ' cannot be deleted');
  }
});

app.put('/alarms/:id', (req, res, next) => {
  let alarm_id = req.params.id;
  try {
    edit_alarm(alarm_id, req.body);
    res.send('alarm with id ' + alarm_id + ' successfully edited');
  } catch (e) {
    console.log('Error while editing alarm ! ');
    console.log(e);
    res.send('alarm with id ' + alarm_id + ' cannot be edited');
  }
});

app.listen(PORT, () => {
  console.log('raspalrm-server listen on port : ' + PORT);
});
