# RaspAlarm controller
## Description
This app is the server side of the raspAlarm project. It is composed of :
 - A node.js app wich provides endpoints to manage alarms and save it to crontab
 - A python script wich is executed by crontab

The goal of this app is to use a raspberry pi (or any linux computer) as an alarm clock wich uses spotify content (playlists, songs...) as alarms. The alarm will ring on a specified Spotify Connect deviceé. In further versions it will be possible to chose to play the alarm directly from the raspberry (via audio interface).

## Installation
1. Be sure to have node and npm installed.
2. Run `npm install`
3. Create an empty alarms.json file in data folder
4. Enter the right parameters in the reveil.py script (this will be done in a more clean way - maybe a .env file - in next updates)
5. Run `npm run start`

## More details
More details are comming. This app is not finished yet !