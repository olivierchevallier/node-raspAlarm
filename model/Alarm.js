class Alarm {
  constructor(id, name, hours, minutes, repeat, active, uri) {
    this.id = id;
    this.name = name;
    this.hours = hours;
    this.minutes = minutes;
    this.repeat = repeat;
    this.active = active;
    this.uri = uri;

    this.COMMAND = 'python3 ../reveil.py';
    this.LOG_FILE = 'reveil.log';
  }

  isWeekDays() {
    for (let i = 0; i < this.repeat.length; i++) {
      if (!this.repeat[i]) {
        if (i < 5) {
          return false;
        }
      }
    }
    return true;
  }

  isEveryDay() {
    for (let i = 0; i < this.repeat.length; i++) {
      if (!this.repeat[i]) {
        return false;
      }
    }
    return true;
  }

  isWeekend() {
    for (let i = 0; i < this.repeat.length; i++) {
      if(!this.repeat[i]){
        if (i >= 5) {
          return false;
        }
      }
    }
    return true;
  }

  repeatToString() {
    let res = '';
    for (let i = 0; i < this.repeat.length; i++) {
      if (this.repeat[i]) {
        res += i + ' ';
      }
    }
    if (this.isEveryDay()) {
      res = 'all days';
    } else {
      if (this.isWeekDays()) {
        res = 'weekdays';
      } else if (this.isWeekend()) {
        res = 'weekend';
      }
    }
    return res;
  }

  activeToString() {
    return this.active ? 'active' : 'disabled';
  }

  formatTimeNumber(number) {
    return number < 10 ? '0' + number : number;
  }

  toString() {
    return (
      this.id +
      ' : ' +
      this.name + ' ' +
      this.repeatToString() +
      ' at ' +
      this.formatTimeNumber(this.hours) +
      'h' +
      this.formatTimeNumber(this.minutes) +
      ' ' +
      this.activeToString() +
      ' ' +
      this.uri
    );
  }

  bash_command() {
    return this.COMMAND + ' ' + this.uri + ' >>' + this.LOG_FILE;
  }

  cron_repeat() {
    let value = this.minutes + ' ' + this.hours + ' * *';
    let days = '';
    for (let i = 0; i < this.repeat.length; i++) {
      let last_index = this.repeat.length - 1;
      if(this.repeat[i]) {
        days += days === '' ? '' : ',';
        days += i < last_index ? i + 1 : 0;
      }
    }
    value += ' ' + days;
    return value;
  }
}

module.exports = Alarm;
