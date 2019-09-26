var shell = require('shelljs')

const test = (ctx) => {
    shell.exec('wget -O Super_Secret_File ' + ctx.command.args[0])
    while(shell.exec('ps -ef | grep wget | grep -v grep') != ''){}
    ctx.reply('TERMINADA LA DESCARGA')
}

module.exports = test