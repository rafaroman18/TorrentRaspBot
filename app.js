const Telegraf = require('telegraf')
const commandArgs = require('./arguments')
const download = require('./download')
const shell = require('shelljs')
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

bot.start((ctx) => ctx.reply('Welcome to TorrentRaspBot! \nWrite /help to see the available commands!'))
bot.help((ctx) => ctx.reply('These are the available commands:\n/download "url file" "name file" -> Downloads the file and automatically uploads it to Google Drive\n/author -> Shows the author and some info of him'))
bot.command('author', (ctx) => ctx.reply('Author: Rafael Roman \nGithub: github.com/rafaroman18 \n2019'))
bot.command('download', download)
bot.command('update', UP)

bot.launch()

async function UP(ctx) {
  const { stdout, stderr, code } = await shell.exec('transmission-remote -n \'transmission:transmission\' -t 1 -f', { silent: true }, { async: true })
  if (stdout == '') {
    await ctx.reply('The torrent has finished already or maybe no torrent has been started.')
  }
  else {
    await ctx.reply('The actual status of the torrent is' + '\n' + stdout)
  }
}