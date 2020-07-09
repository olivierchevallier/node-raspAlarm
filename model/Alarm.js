class Alarm {
  constructor(id, name, hours, minutes, repeat, active, uri) {
    this.id = id;
    this.name = name;
    this.hours = hours;
    this.minutes = minutes;
    this.repeat = repeat;
    this.active = active;
  }

  isWeekDays() {
    for (i = 0; i < this.repeat.length; i++) {
      if (!this.repeat[i]) {
        if (i < 5) {
          return false;
        }
      }
    }
  }

  isEveryDay() {
    for (i = 0; i < this.repeat.length; i++) {
      if (!this.repeat[i]) {
        return false;
      }
    }
  }

  isWeekend() {
    for (i = 0; i < this.repeat.length; i++) {
      if (i >= 5) {
        return false;
      }
    }
  }

  repeatToString() {
    let allDays = true,
      weekDays = true,
      weekEnd = true;
    let res = '';
    for (i = 0; i < this.repeat.length; i++) {
      if (this.repeat[i]) {
        res += i + ' ';
      }
    }
    if (this.isEveryDay()) {
      res = 'all days';
    } else {
      if (this.weekDays) {
        res = 'weekdays';
      } else if (this.weekEnd) {
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
      ' :' +
      this.name +
      this.repeatToString +
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
}

module.exports = Alarm;
