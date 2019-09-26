#!/bin/bash
sudo rm /var/lib/transmission-daemon/downloads/Super_Secret_File.torrent
mkdir -p ~/mnt/gdrive/TRBDownloads
mv /var/lib/transmission-daemon/downloads/* ~/mnt/gdrive/TRBDownloads