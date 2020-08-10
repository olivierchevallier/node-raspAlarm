class Alarm {
  constructor(id, name, hours, minutes, repeat, active, uri) {
    this.id = id;
    this.name = name;
    this.hours = hours;
    this.minutes = minutes;
    this.repeat = repeat;
    this.active = active;
    this.uri = uri;
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
      if (i >= 5) {
        return false;
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
}

module.exports = Alarm;
