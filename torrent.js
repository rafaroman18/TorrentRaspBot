var shell = require('shelljs')

async function torrent(ctx,name) {
    try{
        await ctx.reply("Torrent File detected. Starting Transmission...")
        await shell.exec('transmission-remote -n \'transmission:transmission\' -a /tempDownload/'+ name, { silent: true }, { async: true })
        await ctx.reply('Torrent file added.')

        await ctx.reply('Starting ' + name + ' torrent.')
        await shell.exec('transmission-remote -n \'transmission:transmission\' -t 1 -s', { silent: true }, { async: true })

    }catch(error){
        console.log(error)
        ctx.reply('An error has ocurred starting Transmission.')
    }
}

module.exports = torrent
