const Telegraf = require('telegraf')
const commandArgs = require('./arguments')
const download = require('./download')
var shell = require('shelljs')
var fs = require('fs')

const test = require('./test')

var token = fs.readFileSync('/home/pi/telegramBOTToken.txt', 'utf8').split('\n')
console.log(token)
const bot = new Telegraf(token)

bot.use(commandArgs) //Divide the message chat into raw/command/args

bot.start((ctx) => ctx.reply('Welcome to TorrentRaspBot! \nWrite /help to see the available commands!') )
bot.help((ctx) => ctx.reply('These are the available commands:\n/download "file url" -> Downloads the file and automatically uploads it to Google Drive\n/author -> Shows the author and some info of him'))
bot.command('author',(ctx) => ctx.reply('Author: Rafael Roman \nGithub: github.com/rafaroman18 \n2019'))
bot.command('download', download)            //(ctx)=>ctx.reply('HEY'))
bot.command('test',test)

bot.launch()
