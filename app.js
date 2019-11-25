const Telegraf = require('telegraf')
const commandArgs = require('./arguments')
const download = require('./download')
const shell = require('shelljs')
const update = require('./update')
require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN)

bot.use(async (ctx, next) => { //This line allows the BOT to ONLY work for me (based on my chat_id)
  ctx.chat.id == process.env.CHATID && await next(ctx)
})

bot.use(commandArgs) //Divide the message chat into raw/command/args


// Commands:
// start -> Shows a welcome message!
// help -> Shows a list of the available commands.
// author -> Info about me and my github :)
// download -> The format is this: {/download "url" "FileName"} It downloads the file of the url, if the file is ".torrent"
//             then download the torrent, and then uploads it to Google Drive
// update -> returns the state of all the torrents

bot.start((ctx) => ctx.reply('Welcome to TorrentRaspBot! \nWrite /help to see the available commands!'))
bot.help((ctx) => ctx.reply('These are the available commands:\n/download "url file" "name file" -> Downloads the file and automatically uploads it to Google Drive\n/update -> return the state of all torrents in that moment\n/author -> Shows the author and some info of him'))
bot.command('author', (ctx) => ctx.reply('Author: Rafael Roman \nGithub: github.com/rafaroman18 \n2019'))
bot.command('download', download)
bot.command('update', update)

bot.launch()


