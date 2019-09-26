#!/bin/bash
transmission-remote -n 'transmission:transmission' -a ~/Super_Secret_File.torrent #We add the torrent
transmission-remote -n 'transmission:transmission' -s -t 1 #We start the torrent
VAR = transmission-remote -n 'transmission:transmission' -t 1 -f
while[test -n $VAR]{
VAR = transmission-remote -n 'transmission:transmission' -t 1 -f
}
echo "Download Complete!"

