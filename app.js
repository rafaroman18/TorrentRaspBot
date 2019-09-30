const Telegraf = require('telegraf')
const commandArgs = require('./arguments')
const download = require('./download')
require('dotenv').config()

var shell = require('shelljs')

const test = require('./test')

const bot = new Telegraf(process.env.TOKEN)

bot.use(async (ctx,next)=>{
  ctx.chat.id == process.env.CHATID && await next(ctx)})
  

bot.use(commandArgs) //Divide the message chat into raw/command/args

bot.start((ctx) => ctx.reply('Welcome to TorrentRaspBot! \nWrite /help to see the available commands!') )
bot.help((ctx) => ctx.reply('These are the available commands:\n/download "file url" -> Downloads the file and automatically uploads it to Google Drive\n/author -> Shows the author and some info of him'))
bot.command('author',(ctx) => ctx.reply('Author: Rafael Roman \nGithub: github.com/rafaroman18 \n2019'))
bot.command('download', download) 

bot.launch()
