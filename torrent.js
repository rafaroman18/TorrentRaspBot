var shell = require('shelljs')
const drive = require('./drive')

const torrent = (ctx) => {
    ctx.reply('Starting Download...')
    shell.exec('sudo bash script_Torrent.sh')
    ctx.reply('Downloaded.')
    drive
}

module.exports = torrent