# TorrentRaspBot
Telegram BOT capable of managing downloads and Torrent Files and auto uploading to Google Drive (all this through a Raspberry Pi 3B+)

## NOT FULLY WORKING YET
### We are working on that... 🛠

## **Introduction**

The goal behind this project is to create a Telegram BOT that we can send links of movies/series and the BOT will download that content and upload it to our Google Drive. 

The idea is that we can download things even if we are outside and dont want to download it in our phone because of storage or data limits.

This is accomplished by placing a Raspberry PI in our house and running the code of this project. 

## **Behaviour**

Our BOT will receive the link, download the file and then:

* If it is a torrent file, it will download the content and upload it to our Google Drive Account
* If it is not, it will directly upload the file to our Drive Account.

## **Use**
```\start``` - Prompts a explanatory message of the BOT.

```\help``` - Show all the commands available.

```\author``` - Shows my name and github page :)

```\download``` - This is the format to download: {/download "url" "FileName"} It downloads the file of the url. If the file is ".torrent" then download the torrent, in both cases, it will uploads it to Google Drive.

```\update``` - Returns the state of all the currents downloading torrents.


### LICENSE 

 MIT License - Copyright (c) 2021 [Rafa Román](https://github.com/rafaroman18)
