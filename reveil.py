import re
import time
import sys
import datetime
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth

def getDeviceId(deviceRe):
  connectDevices = spotify.devices()
  for connectDevice in connectDevices['devices']:
    if re.fullmatch(deviceRe,connectDevice['name']):
      return connectDevice['id']

now = datetime.datetime.now()
print(' ')
print('----------------------------------------------------------------------------')
print('Starting alarm ' + now.strftime('%m %b, %Y') + ' at ' + now.strftime('%H:%M:%S'))
print('----------------------------------------------------------------------------')
print(' ')

scope = "user-modify-playback-state,user-read-playback-state"
spotify = spotipy.Spotify(oauth_manager=SpotifyOAuth(username='fooktoo', redirect_uri='http://localhost:8080/callback', scope=scope, client_id='197fdcabcaa5472f994e3d2f4fbfc1f8', client_secret='b46d07f63f3047379853626c7afa681b'))

deviceRe = '.*Metric.*'
contentUri = 'spotify:playlist:2wrEhXOC30gYgniZR9zegM'
deviceId = getDeviceId(deviceRe)
initialVolume = 10
volumeIncrease = 30

if len(sys.argv) > 1:
  contentUri = sys.argv[1]

try:
  spotify.start_playback(device_id=deviceId, context_uri=contentUri)
except:
  print('Device not found, or context_uri is invalid')
  print('Finishing alarm script') 
  exit()

print('Device found')
while not spotify.current_playback()['is_playing']:
  print('Waiting for playback to start...')
  time.sleep(1)
spotify.shuffle(True, device_id=deviceId)
spotify.volume(initialVolume, device_id=deviceId)
spotify.start_playback(device_id=deviceId, context_uri=contentUri)
print('playback started')

for i in range(1, volumeIncrease): 
  time.sleep(16)
  volume = initialVolume + i
  spotify.volume(volume, device_id=deviceId)
  print('Volume set to ' + str(volume) + '%')

print('\n Finishing alarm script')
