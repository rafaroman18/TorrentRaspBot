# TorrentRaspBot

A Telegram bot that runs on a Raspberry Pi 3B+ at home and downloads files and torrents for you, so you don't have to do it on your phone. Send it a link from wherever you are, and the Pi does the heavy lifting.

The long-term idea is that finished downloads end up in your Google Drive. That last part is not finished yet (see the status section below).

## Why I built it

I wanted to be able to queue a movie or a series while I was out, without eating my mobile data or filling my phone's storage. The Raspberry Pi is already on at home, so it made sense to let it handle the downloads and hand me the result later.

## How it works

You send the bot a message with a link and it decides what to do with it:

- If the link is a magnet link, it hands it straight to WebTorrent.
- If it is a direct URL, it downloads the file into a temporary folder and checks its type with the `file` command. If it turns out to be a `.torrent`, it gets passed to WebTorrent. Otherwise it is treated as a regular file.
- When a torrent finishes, the bot tells you in the chat.

The bot only answers to a single Telegram chat, identified by its chat id. Anyone else who writes to it is ignored.

## Current status

This is a personal project and it is still a work in progress. Being honest about what works and what doesn't:

- Telegram commands, magnet links, `.torrent` downloads and progress reports work.
- The Google Drive upload is not implemented yet. The `drive.js` module currently only simulates the step and sends you the "uploaded" messages.

## Commands

| Command | What it does |
| --- | --- |
| `/start` | Welcome message. |
| `/help` | Lists the available commands. |
| `/author` | Shows who made the bot. |
| `/download "url" "FileName"` | Downloads the file at the url and saves it with the given name. Magnet links only need the link. |
| `/update` | Shows the progress, remaining time and speed of every torrent currently downloading. |

## Requirements

- Node.js and npm
- A Telegram bot token (you can get one from @BotFather)
- Your Telegram chat id
- A Linux machine with the `file` command available (a Raspberry Pi with Raspberry Pi OS is what I use)

## Setup

Clone the repository and install the dependencies:

```bash
git clone https://github.com/rafaroman18/TorrentRaspBot.git
cd TorrentRaspBot
npm install
```

Create a `.env` file in the project root:

```
TOKEN=your_telegram_bot_token
CHATID=your_telegram_chat_id
```

Then start the bot:

```bash
node app.js
```

If you want it to keep running after you close the SSH session, something like `pm2` or a systemd service does the job.

## Project layout

- `app.js` - bot setup, command registration and the chat id filter.
- `arguments.js` - middleware that splits a message into command and arguments.
- `download.js` - handles `/download`: magnet links, direct URLs and file type detection.
- `torrent.js` - adds torrents to WebTorrent and reacts when they finish.
- `update.js` - builds the `/update` progress report.
- `drive.js` - placeholder for the Google Drive upload.

## Built with

- [Telegraf](https://telegraf.js.org/) for the Telegram side
- [WebTorrent](https://webtorrent.io/) for the torrents
- [Axios](https://axios-http.com/) for direct downloads
- [ShellJS](https://github.com/shelljs/shelljs) to call system commands
- [dotenv](https://github.com/motdotla/dotenv) for configuration

## Things I want to do next

- Real Google Drive upload with the official API
- Better error handling when a link is dead or a download stalls
- Delete local files once they have been uploaded

## Disclaimer

Only download content you have the right to download. What you do with this bot is your own responsibility.

## License

MIT License. Copyright (c) 2021 [Rafa Román](https://github.com/rafaroman18)
