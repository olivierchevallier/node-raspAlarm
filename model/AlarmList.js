const fs = require('fs');

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
        alarmJSON.hh,
        alarmJSON.mm,
        alarmJSON.repeat,
        alarmJSON.active,
        alarmJSON.uri
      );
      this.alarms.push(alarm);
    });
  }

}


module.exports = AlarmList;
