const fs = require('fs');
const jsonFile = require('jsonfile');

const Alarm = require('./Alarm');

const ALARMS_PATH = './data/alarms.json';

class AlarmList {
  constructor() {
    let data = fs.readFileSync(ALARMS_PATH);
    let alarmsJSON = JSON.parse(data);
    this.alarms = Array();
    alarmsJSON.forEach((alarmJSON) => {
      let alarm = new Alarm(
        alarmJSON.id,
        alarmJSON.name,
        alarmJSON.hours,
        alarmJSON.minutes,
        alarmJSON.repeat,
        alarmJSON.active,
        alarmJSON.uri
      );
      this.alarms.push(alarm);
    });
  }

  get(alarm_id) {
    let to_return = this.alarms.findIndex((alarm) => {
      return alarm_id == alarm.id;
    });
    if(to_return < 0) {
      throw 'Cannot find alarm with id ' + alarm_id;
    }
    return this.alarms[to_return];
  }

  append(alarmJSON, alarm_id = -1) {
    let id = alarm_id == -1 ? this.getNextId() : alarm_id;
    let alarm = new Alarm(
      id,
      alarmJSON.name,
      alarmJSON.hours,
      alarmJSON.minutes,
      alarmJSON.repeat,
      alarmJSON.active,
      alarmJSON.uri
    );
    this.alarms.push(alarm);
    this.save();
  }

  delete(alarm_id) {
    let to_delete = this.alarms.findIndex((alarm) => {
      return alarm_id == alarm.id;
    });
    if(to_delete < 0) {
      throw 'Cannot find alarm with id ' + alarm_id;
    }
    this.alarms.splice(to_delete, 1);
    this.save();
  }

  edit(alarm_id, alarmJSON) {
    try {
      this.delete(alarm_id);
    } catch(e) {
      throw e;
    }
    this.append(alarmJSON, alarm_id);
    this.save();
  }

  save() {
    console.log(this.alarms);
    jsonFile.writeFile(ALARMS_PATH, this.alarms);
    this.write_crontab();
  }

  getNextId() {
    let lastIndex = this.alarms.length - 1;
    let lastId = this.alarms[lastIndex].id;
    return lastId + 1;
  }

  toString() {
    let string = '';
    this.alarms.forEach((alarm) => {
      string += alarm.toString() + '\n';
    });
    return string;
  }

  write_crontab() {
    require('crontab').load((err, crontab) => {
      crontab.reset();
      this.alarms.forEach((alarm) => {
        crontab.create(alarm.bash_command(), alarm.cron_repeat());
      });
      crontab.save(function(err, crontab) {
  
      });
    });
  }
}

module.exports = AlarmList;
